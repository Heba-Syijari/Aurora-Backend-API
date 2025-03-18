import { CreateProjectDto, UpdateProjectDto } from 'src/datasource/dto/project';
import { Media } from 'src/datasource/entities/media.entity';
import { Project } from 'src/datasource/entities/project.entity';
import { RequireAtLeastOne } from 'src/types/declaration';

export type IFindAllProjectsFilter = {
  userId?: string;
};

export type IFindProjectFilter = {
  id?: string;
  userId?: string;
  pageId?: number;
};

export type IFindProjectInclude = {
  pages?: boolean;
  posts?: boolean;
  contactMessages?: boolean;
  media?: boolean;
  plugins?: boolean;
};

export type IUpdateProjectSettingsPayload = {
  projectId: string;
  logoType: string;
  logoValue: string;
  fontFamily: string;
  palette: {
    primary: string;
    secondary: string;
    neutral: string;
    titles: string;
    subTitles: string;
  };
};

export interface IProjectRepository {
  findAll(filter: IFindAllProjectsFilter): Promise<Project[]>;

  findOne(
    filter: RequireAtLeastOne<IFindProjectFilter>,
    include?: IFindProjectInclude,
  ): Promise<Project>;

  count(filter: RequireAtLeastOne<IFindProjectFilter>): Promise<number>;

  create(dto: CreateProjectDto): Promise<Project>;

  update(dto: UpdateProjectDto): Promise<boolean>;

  delete(projectId: string): Promise<boolean>;

  setPullZoneId(projectId: string, cdnPullZoneId: number): Promise<boolean>;

  updateSettings(payload: IUpdateProjectSettingsPayload): Promise<boolean>;

  getProjectMedia(projectId: string): Promise<Media[]>;
}

export const IProjectRepository = Symbol('IProjectRepository');
