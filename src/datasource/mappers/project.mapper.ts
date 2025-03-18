import {
  Component,
  ComponentsPages,
  ContactMessage,
  DomainRegistration,
  DomainRegistrationsOnProjects,
  Media,
  Page,
  Plugin,
  Post,
  ProjectAudience,
  Project as ProjectModel,
  ProjectSettings,
} from '@prisma/client';
import { LanguageType, PluginVariation } from 'src/types';
import { Project } from '../entities/project.entity';

type PageComponentModel = ComponentsPages & {
  component: Component;
};

type PageModel = Page & {
  components: PageComponentModel[];
};

type ProjectRelations = {
  settings?: ProjectSettings;
  audience?: ProjectAudience;
  pages?: PageModel[];
  posts?: Post[];
  contactMessages?: ContactMessage[];
  media?: Media[];
  plugins?: Plugin[];
  domainRegistration?: DomainRegistrationsOnProjects & {
    domainRegistration?: DomainRegistration;
  };
};

export class ProjectMapper {
  static fromDB(project: ProjectModel & ProjectRelations): Project {
    const intellectualPropertyInfo = JSON.parse(
      project.intellectualPropertyInfo as string,
    );

    const { subdomain, domainName, url } =
      ProjectMapper.getDomainNameAndPublicURL(project.id);

    const mappedProject: Project = {
      id: project.id,
      userId: project.userId,
      name: project.name,
      type: project.type,
      purpose: project.purpose,
      description: project.description,
      keywords: project.keywords,
      similarWebsites: project.similarWebsites,
      websiteLocation: project.websiteLocation,
      mainLanguage: project.mainLanguage as LanguageType,
      createdAt: project.createdAt,
      intellectualPropertyType: project.intellectualPropertyType,
      intellectualPropertyInfo,
      cdnPullZoneId: project.cdnPullZoneId,
      domainName,
      subdomain,
      publicURL: url,
      ...(project.audience && { audience: project.audience }),
      ...(project.posts && { posts: project.posts }),
      ...(project.media && { media: project.media }),
      ...(project.contactMessages && {
        contactMessages: project.contactMessages,
      }),
      ...(project.domainRegistration && {
        domainRegistration: project.domainRegistration,
      }),
    };

    if (project.settings) {
      mappedProject.settings = {
        ...project.settings,
        palette: {
          primary: project.settings.palette['primary'],
          secondary: project.settings.palette['secondary'],
          neutral: project.settings.palette['neutral'],
          titles: project.settings.palette['titles'],
          subTitles: project.settings.palette['subTitles'],
        },
      };
    }

    if (project.pages) {
      mappedProject.pages = project.pages.map((page) => ({
        ...page,
        components: page.components.map((component) => ({
          ...component,
          data: component.data,
        })),
      }));
    }

    if (project.plugins) {
      mappedProject.plugins = project.plugins.map((plugin) => ({
        ...plugin,
        variation: plugin.variation as PluginVariation,
      }));
    }

    return mappedProject;
  }

  private static getDomainNameAndPublicURL(projectId: string): {
    subdomain: string;
    url: string;
    domainName: string;
  } {
    const subdomain = `project-${projectId}`;
    const domainName = `project-${projectId}.b-cdn.net`;
    const url = `https://${domainName}`;

    return { subdomain, domainName, url };
  }
}
