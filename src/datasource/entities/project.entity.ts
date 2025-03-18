import {
  IntellectualPropertyType,
  LanguageTypeVariation,
  PluginVariation,
  ProjectTypeVariation,
} from 'src/types';
import { ContactMessage } from './contact-message.entity';
import { DomainRegistration } from './domain-registration.entity';
import { Media } from './media.entity';
import { Page } from './page.entity';
import { Post } from './post.entity';

export class Project {
  id: string;
  userId: string;
  name: string;
  type: ProjectTypeVariation;
  purpose: string;
  description: string;
  keywords: string[];
  similarWebsites: string[];
  websiteLocation: string;
  mainLanguage: LanguageTypeVariation;
  createdAt: Date;
  intellectualPropertyType: IntellectualPropertyType;
  intellectualPropertyInfo: Record<string, any>;
  cdnPullZoneId?: number;
  domainName: string;
  subdomain: string;
  publicURL: string;
  settings?: ProjectSettings;
  audience?: ProjectAudience;
  pages?: Page[];
  posts?: Post[];
  media?: Media[];
  contactMessages?: ContactMessage[];
  plugins?: ProjectPlugin[];
  domainRegistration?: ProjectDomainRegistration;
}

export class ProjectAudience {
  id: number;
  projectId: string;
  age: string[];
  gender: string[];
  organizations?: string[];
  countries?: string[];
}

export class ProjectSettings {
  id: number;
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
}

class ProjectPlugin {
  id: number;
  key: string;
  value: string;
  variation: PluginVariation;
  projectId: string;
}

type ProjectDomainRegistration = {
  domainRegistrationId: number;
  projectId: string;
  domainRegistration?: DomainRegistration;
};
