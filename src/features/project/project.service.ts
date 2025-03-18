import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BunnyCDNService } from 'src/cdn/bunny';
import { Project } from 'src/datasource/entities/project.entity';
import { IContactMessageRepository } from 'src/datasource/repositories/contact-message';
import { IPageRepository } from 'src/datasource/repositories/page';
import { IProjectRepository } from 'src/datasource/repositories/project';
import { IProjectGenerationRepository } from 'src/datasource/repositories/project-generation';
import { PageLanguage } from 'src/language';
import { MailService } from 'src/mail/mail.service';
import { PluginsService } from 'src/plugins/plugins.service';
import { StorageService } from 'src/storage/storage.service';
import { PluginVariation, ProjectGenerationStatus } from 'src/types';
import { AnalyticsService } from '../analytics/analytics.service';
import { Elements } from '../components/elements';
import { PageService } from '../page/page.service';
import { PostService } from '../post/post.service';
import { UsersService } from '../users/users.service';
import { projectTargetTypes } from './data/target-types';
import {
  CreateProjectContactMessageInput,
  CreateProjectInput,
  UpdateProjectInput,
  UpdateProjectSettingsInput,
} from './dto';
import { ProjectTargetType } from './entities/target-type';
import { ExportProjectService } from './services/export-project.service';

@Injectable()
export class ProjectService {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @Inject(IProjectGenerationRepository)
    private readonly projectGenerationRepository: IProjectGenerationRepository,
    @Inject(IPageRepository)
    private readonly pageRepository: IPageRepository,
    @Inject(IContactMessageRepository)
    private readonly contactMessageRepository: IContactMessageRepository,
    private readonly pluginsService: PluginsService,
    private readonly exportProjectService: ExportProjectService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
    private readonly bunnyCDNService: BunnyCDNService,
    private readonly pageService: PageService,
    private readonly analyticsService: AnalyticsService,
    private readonly postService: PostService,
  ) {}

  async getProjectTargetTypes(): Promise<ProjectTargetType[]> {
    return projectTargetTypes;
  }

  async getProjectsForUser(userId: string) {
    try {
      const projects = await this.projectRepository.findAll({ userId });

      return projects;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        `error while fetching projects for user [${userId}]`,
      );
    }
  }

  async getProject(id: string, userId: string) {
    try {
      const project = await this.projectRepository.findOne(
        { id, userId },
        {
          contactMessages: true,
          media: true,
          pages: true,
          plugins: true,
          posts: true,
        },
      );
      project.pages.forEach((page) => {
        page.components.forEach((component) => {
          component.elements = Elements[component.component.name] || [];
        });
      });
      return project;
    } catch (err) {
      console.log(err);
      if (err.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException('error while fetching the project');
    }
  }

  async createProject(userId: string, input: CreateProjectInput) {
    try {
      const project = await this.projectRepository.create({ ...input, userId });
      this.handleProjectGeneration(userId, input, project);
      console.timeEnd('create-project');
      return project;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while creating the project');
    }
  }

  private async handleProjectGeneration(
    userId: string,
    input: CreateProjectInput,
    project: Project,
  ) {
    try {
      await Promise.allSettled([
        this.pageService.createPage({
          generateAI: input.generateAI,
          projectId: project.id,
          title: PageLanguage.HOME[project.mainLanguage],
          description: project.description,
          sections: input.sections,
        }),
        this.pageService.createPage({
          projectId: project.id,
          title: PageLanguage.TERMS_AND_SERVICES[project.mainLanguage],
          description: project.description,
          sections: [input.sections[input.sections.length - 1]],
        }),
        this.pageService.createPage({
          projectId: project.id,
          title: PageLanguage.PRIVACY_POLICY[project.mainLanguage],
          description: project.description,
          sections: [input.sections[input.sections.length - 1]],
        }),
        this.handleConnectProjectPlugins(project.id, input.plugins),
      ]);

      await this.projectGenerationRepository.update({
        projectId: project.id,
        status: ProjectGenerationStatus.COMPLETED,
      });
    } catch (err) {
      console.log({ err });

      await this.projectGenerationRepository.update({
        projectId: project.id,
        status: ProjectGenerationStatus.FAILED,
        logs: err,
        error: 'error while generating the project components',
      });
    }
  }

  private async handleCreateProjectPosts(
    userId: string,
    projectId: string,
    posts: { title: string; description: string }[],
  ) {
    try {
      await this.postService.createPosts(userId, {
        projectId,
        posts,
      });
    } catch (err) {
      console.log({ err });
    }
  }

  private async handleConnectProjectPlugins(
    projectId: string,
    plugins: PluginVariation[],
  ) {
    if (plugins.includes('IADAM')) {
      await this.pluginsService.createAdamAI(projectId);
    }
  }

  async updateProjectSettings(input: UpdateProjectSettingsInput) {
    try {
      await this.projectRepository.updateSettings({
        projectId: input.projectId,
        logoType: input.logoType,
        logoValue: input.logoValue,
        fontFamily: input.fontFamily,
        palette: input.palette,
      });

      await this.pageRepository.update({
        pageId: input.pageId,
        title: input.pageTitle,
        description: input.pageDescription,
      });

      return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the project');
    }
  }

  async updateProject(userId: string, input: UpdateProjectInput) {
    try {
      const result = await this.projectRepository.update({ ...input, userId });

      if (input.plugins) {
        await this.handleConnectProjectPlugins(input.id, input.plugins);
      }

      return result;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while updating the project');
    }
  }

  async createProjectContactMessage(input: CreateProjectContactMessageInput) {
    try {
      await this.contactMessageRepository.create(input);

      return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while sending the message');
    }
  }

  async exportProject(userId: string, projectId: string) {
    try {
      const user = await this.usersService.findById(userId);

      this.handleStoreExportedProjectFiles(projectId, user);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException(err.message);
    }

    return true;
  }

  private async handleStoreExportedProjectFiles(
    projectId: string,
    user: {
      id: string;
      name: string;
      email: string;
    },
  ) {
    const project = await this.projectRepository.findOne({ id: projectId });

    try {
      console.log('Exported start');
      const file = await this.exportProjectService.export(user.id, projectId);
      console.log('upload start');
      const { fileURL } = await this.storageService.storeFile('websites', {
        buffer: file.buffer,
        originalname: file.filename,
        mimetype: file.contentType,
      } as any);
      console.log('upload sucsses');

      this.mailService.sendExportedWebsite(user, fileURL);
    } catch (err) {
      console.log(err);
      this.mailService.sendExportingWebsiteFailed(user, project.name);
    }
  }

  async publishProject(userId: string, projectId: string) {
    try {
      const user = await this.usersService.findById(userId);

      const project = await this.projectRepository.findOne({
        id: projectId,
        userId: userId,
      });

      this.handlePublishProject(
        {
          id: project.id,
          name: project.name,
          cdnPullZoneId: project.cdnPullZoneId,
          subdomain: project.subdomain,
          publicURL: project.publicURL,
        },
        user,
      );
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException(err.message);
    }

    return true;
  }

  public async deleteProject(projectId: string): Promise<boolean> {
    const project = await this.projectRepository.findOne({ id: projectId });

    try {
      if (project.cdnPullZoneId) {
        await this.bunnyCDNService.deletePullZone(project.cdnPullZoneId);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      await this.projectRepository.delete(projectId);

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  }

  private async handlePublishProject(
    project: {
      id: string;
      name: string;
      cdnPullZoneId: number;
      subdomain: string;
      publicURL: string;
    },
    user: { id: string; name: string; email: string },
  ) {
    try {
      const file = await this.exportProjectService.export(user.id, project.id);

      const folderName = `websites/${project.id}`;

      await this.storageService.extractZipFileThenStoreInFolder(
        file.buffer,
        folderName,
      );

      const folderPath = this.storageService.resolvePath(folderName);

      if (!project.cdnPullZoneId) {
        const { id: pullZoneId } = await this.bunnyCDNService.addPullZone({
          name: project.subdomain,
          originUrl: folderPath,
        });

        await this.projectRepository.setPullZoneId(project.id, pullZoneId);
      } else {
        console.log('should purge the pull zone');
        // purge pull zone cache to see the new uploaded files
        await this.bunnyCDNService.purgeCache(project.cdnPullZoneId);
      }

      this.mailService.sendWebsitePublished(
        user,
        project.publicURL,
        project.name,
      );
    } catch (err) {
      console.log(err);
      this.mailService.sendWebsitePublishingFailed(user, project.name);
    }
  }

  async createAnalyticsProperty(userId: string, id: string) {
    try {
      const project = await this.projectRepository.findOne({ id, userId });

      await this.analyticsService.createProperty({
        projectId: id,
        defaultUri: project.publicURL,
      });

      await this.publishProject(userId, id);

      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException(
        'error while creating analytics property, please try again later',
      );
    }
  }

  public async getProjectGeneration(projectId: string) {
    try {
      const generation = await this.projectGenerationRepository.findOne(
        projectId,
      );

      return generation;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('error while fetching project generation');
    }
  }
}
