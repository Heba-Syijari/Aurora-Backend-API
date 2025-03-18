import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JSONScalar } from 'src/common/graphql/scalars';
import { ContactMessage } from 'src/features/contact-message/entities/contact-message.entity';
import { Media } from 'src/features/media/entities/media.entity';
import { Page } from 'src/features/page/entities/page.entity';
import { Post } from 'src/features/post/entities/post.entity';
import {
  IntellectualPropertyType,
  LanguageTypeVariation,
  ProjectTypeVariation,
} from 'src/types';
import { ProjectAudience } from './project-audience.entity';
import { ProjectDomainRegistration } from './project-domain-registration.entity';
import { ProjectPlugin } from './project-plugin.entity';
import { ProjectSettings } from './project-settings.entity';

@ObjectType()
export class Project {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  type: ProjectTypeVariation;

  @Field()
  purpose: string;

  @Field()
  description: string;

  @Field(() => [String])
  keywords: string[];

  @Field(() => [String])
  similarWebsites: string[];

  @Field()
  websiteLocation: string;

  @Field()
  mainLanguage: LanguageTypeVariation;

  @Field()
  createdAt: Date;

  @Field()
  intellectualPropertyType: IntellectualPropertyType;

  @Field(() => JSONScalar)
  intellectualPropertyInfo: any;

  @Field(() => ProjectAudience, { name: 'audience', nullable: true })
  audience?: ProjectAudience;

  @Field(() => ProjectSettings, { name: 'settings', nullable: true })
  settings?: ProjectSettings;

  @Field(() => [Page], { name: 'pages', nullable: true })
  pages?: Page[];

  @Field(() => [Post], { name: 'posts', nullable: true })
  posts?: Post[];

  @Field(() => [Media], { name: 'media', nullable: true })
  media?: Media[];

  @Field(() => [ContactMessage], { name: 'contactMessages', nullable: true })
  contactMessages?: ContactMessage[];

  @Field(() => Int, { nullable: true })
  cdnPullZoneId?: number;

  @Field()
  publicURL: string;

  // --- plugins ------
  @Field(() => [ProjectPlugin], { nullable: true })
  plugins?: ProjectPlugin[];

  // --- domainRegistration ------
  @Field(() => ProjectDomainRegistration, { nullable: true })
  domainRegistration?: ProjectDomainRegistration;
}
