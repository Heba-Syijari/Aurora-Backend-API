import { Injectable } from '@nestjs/common';
import { ComponentType } from '@prisma/client';
import { StorageService } from 'src/storage/storage.service';
import { ContentGeneratorService } from '../content-generator/content-generator.service';
import {
  ContentGeneratorAboutService,
  ContentGeneratorHeroService,
} from '../content-generator/service';
import { ContentGeneratorFeatureService } from '../content-generator/service/content-generator-feature.service ';
import { AboutFactory } from './factory/about';
import { BlogsFactory } from './factory/blogs';
import { ContactFactory } from './factory/contact';
import { FAQsFactory } from './factory/faqs';
import { FeatureFactory } from './factory/feature';
import { FooterFactory } from './factory/footer';
import { GalleryFactory } from './factory/gallery';
import { HeroFactory } from './factory/hero';
import { HowItWorkFactory } from './factory/how-it-works';
import { IComponentFactory } from './factory/icomponent.factory';
import { MessageWithActionFactory } from './factory/message-with-action';
import { OurClientsFactory } from './factory/our-clients';
import { OurSolutionFactory } from './factory/our-solution';
import { PrivacyPolicyFactory } from './factory/privacy-policy';
import { SliderFactory } from './factory/slider';
import { SupscriptionFactory } from './factory/supscription';
import { TeamFactory } from './factory/team';
import { TermsAndServiceFactory } from './factory/terms-and-service';
import { VideoFactory } from './factory/video';

@Injectable()
export class ComponentsFactory {
  constructor(
    private readonly contentGeneratorAboutService: ContentGeneratorAboutService,
    private readonly contentGeneratorHeroService: ContentGeneratorHeroService,
    private readonly contentGeneratorFeatureService: ContentGeneratorFeatureService,
    private readonly contentGeneratorService: ContentGeneratorService,
    private readonly storageService: StorageService,
  ) {}

  create(type: ComponentType): IComponentFactory {
    switch (type) {
      case ComponentType.HERO:
        return new HeroFactory(
          this.contentGeneratorHeroService,
          this.storageService,
        );

      case ComponentType.ABOUT:
        return new AboutFactory(
          this.contentGeneratorAboutService,
          this.storageService,
        );

      case ComponentType.FAQ:
        return new FAQsFactory(this.contentGeneratorService);

      case ComponentType.BLOGS:
        return new BlogsFactory(this.contentGeneratorService);

      case ComponentType.VIDEO:
        return new VideoFactory();

      case ComponentType.CONTACT:
        return new ContactFactory();

      case ComponentType.GALLERY:
        return new GalleryFactory();

      case ComponentType.FEATURES:
        return new FeatureFactory(
          this.contentGeneratorFeatureService,
          this.storageService,
        );

      case ComponentType.TEAM:
        return new TeamFactory();

      case ComponentType.SUBSCRIPTION:
        return new SupscriptionFactory();

      case ComponentType.TERMS_AND_SERVICES:
        return new TermsAndServiceFactory();

      case ComponentType.FOOTER:
        return new FooterFactory();

      case ComponentType.HOW_IT_WORKS:
        return new HowItWorkFactory(this.contentGeneratorService);

      case ComponentType.SLIDER:
        return new SliderFactory(
          this.contentGeneratorService,
          this.storageService,
        );

      case ComponentType.OUR_SOLUTION:
        return new OurSolutionFactory();

      case ComponentType.OUR_CLIENTS:
        return new OurClientsFactory();

      case ComponentType.PRIVACY_POLICY:
        return new PrivacyPolicyFactory(this.contentGeneratorService);

      case ComponentType.MESSAGE_WITH_ACTION:
        return new MessageWithActionFactory();

      default:
        throw new Error(`Component type [${type}] is not implemented`);
    }
  }
}
