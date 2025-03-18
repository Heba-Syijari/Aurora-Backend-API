import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Menu } from 'src/datasource/entities/menu.entity';
import { Plugin as PluginEntity } from 'src/datasource/entities/plugin.entity';
import { Project } from 'src/datasource/entities/project.entity';
import { IAnalyticsRepository } from 'src/datasource/repositories/analytics';
import { IMenuRepository } from 'src/datasource/repositories/menu';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { IAdamConfig } from 'src/plugins/types';
import { Plugin } from 'src/types';

interface ExportedFile {
  filename: string;
  buffer: Buffer;
  contentType?: string;
  contentDisposition?: 'attachment' | 'inline';
}

@Injectable()
export class ExportProjectService {
  private readonly API_URL: string;

  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @Inject(IAnalyticsRepository)
    private readonly analyticsRepository: IAnalyticsRepository,
    @Inject(IMenuRepository)
    private readonly menuRepository: IMenuRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_URL = configService.get('EXPORTER_API_URL');
  }
  async export(userId: string, projectId: string): Promise<ExportedFile> {
    let measurementId: string;

    try {
      const analyticsProperty = await this.analyticsRepository.findOne({
        projectId,
      });

      measurementId = analyticsProperty.measurementId;
    } catch (err) {}

    try {
      const project = await this.projectRepository.findOne(
        {
          userId,
          id: projectId,
        },
        {
          contactMessages: true,
          media: true,
          pages: true,
          plugins: true,
          posts: true,
        },
      );

      const menus = await this.menuRepository.findAll({ projectId });

      const filteredMenus = menus.filter(({ parentId }) => !parentId);

      const adamConfig = this.getAdamConfig(project.plugins || [], projectId);

      return await this.handleExport({
        measurementId,
        project,
        menus: filteredMenus,
        adamConfig,
      });
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException(err.message);
    }
  }

  private getAdamConfig(
    plugins: PluginEntity[],
    projectId: string,
  ): IAdamConfig | undefined {
    const config: IAdamConfig = {
      clientId: this.configService.get('ADAMAI_CLIENT_ID'),
      source: `canvablocks-${projectId}`,
      fontSize: 16,
      primaryColor: '',
      secondaryColor: '',
    };

    plugins.forEach((plugin) => {
      if (plugin.variation === Plugin.IADAM) {
        config[plugin.key] = plugin.value;
      }
    });

    // check if every value is not empty
    return Object.values(config).every(Boolean) ? config : undefined;
  }

  private async handleExport(data: {
    project: Project;
    menus: Menu[];
    measurementId?: string;
    adamConfig?: IAdamConfig;
  }): Promise<ExportedFile> {
    const url = `${this.API_URL}/export`;

    const response = await firstValueFrom(
      this.httpService
        .post(url, { data }, { responseType: 'arraybuffer' })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error occured while exporting the website';
          }),
        ),
    );
    const file: ExportedFile = {
      buffer: response.data,
      contentDisposition: 'attachment',
      filename: `project_${data.project.id}.zip`,
      contentType: response.headers['content-type'] as string,
    };

    return file;
  }
}
