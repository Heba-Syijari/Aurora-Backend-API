import { AboutVariation } from './factory/about/types';
import { ContactVariation } from './factory/contact/types';
import { FAQsVariation } from './factory/faqs/types';
import { FeatureVariation } from './factory/feature/types';
import { FooterVariation } from './factory/footer/types';
import { GalleryVariation } from './factory/gallery/types';
import { HeroVariation } from './factory/hero/types';
import { HowItWorkVariation } from './factory/how-it-works/types';
import { MessageWithActionVariation } from './factory/message-with-action/types';
import { OurClientsVariation } from './factory/our-clients/types';
import { OurSolutionVariation } from './factory/our-solution/types';
import { PrivacyPoliceVariation } from './factory/privacy-policy/types';
import { SliderVariation } from './factory/slider/types';
import { SupscriptionVariation } from './factory/supscription/types';
import { TeamVariation } from './factory/team/types';
import { TermsAndServiceVariation } from './factory/terms-and-service/types';

export const Elements = {
  [AboutVariation.ABOUT_ONE]: ['title', 'subtitle', 'description', 'button'],
  [AboutVariation.ABOUT_TWO]: [
    'title',
    'subtitle',
    'description',
    'button',
    'image',
    'socials',
  ],
  [AboutVariation.ABOUT_THREE]: ['title', 'description', 'button', 'image'],
  [AboutVariation.ABOUT_FOUR]: [
    'title',
    'cardOneTitle',
    'cardOneDescription',
    'cardOneImage',
    'cardTwoTitle',
    'cardTwoDescription',
    'cardTwoImage',
    'description',
    'image',
  ],
  [AboutVariation.ABOUT_FIVE]: ['title', 'postTitle', 'image', 'items'],
  [AboutVariation.ABOUT_SIX]: [
    'descriptionOne',
    'descriptionTwo',
    'descriptionThree',
    'image',
  ],
  [AboutVariation.ABOUT_SEVEN]: ['description', 'image', 'items'],
  BLOGS_ONE: ['title', 'description'],
  BLOGS_TWO: ['title', 'description'],
  [ContactVariation.CONTACT_ONE]: [
    'map',
    'workTimesDays',
    'workTimesHours',
    'firstHolidayHours',
    'firstHolidayDays',
    'secondHolidayDays',
    'secondHolidayHours',
    'address',
    'title',
    'number',
    'email',
    'socials',
  ],
  [ContactVariation.CONTACT_TWO]: [
    'button',
    'address',
    'title',
    'number',
    'email',
    'socials',
  ],
  [ContactVariation.CONTACT_THREE]: ['number', 'email', 'socials'],
  [ContactVariation.CONTACT_FOUR]: ['address', 'number', 'email', 'socials'],
  [ContactVariation.CONTACT_FIVE]: [
    'button',
    'number',
    'email',
    'title',
    'titleCardOne',
    'titleCardTwo',
  ],
  [ContactVariation.CONTACT_SIX]: [
    'button',
    'title',
    'subtitle',
    'number',
    'email',
    'WhatsApp',
    'telegram',
  ],
  [ContactVariation.CONTACT_SEVEN]: [
    'button',
    'number',
    'title',
    'email',
    'WhatsApp',
    'imageTitle',
    'imageSubTitle',
    'description',
    'backGroundImage',
  ],
  [FAQsVariation.FAQ_ONE]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_TWO]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_THREE]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_FOUR]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_FIVE]: ['title', 'items'],
  [FAQsVariation.FAQ_SIX]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_SEVEN]: ['title', 'description', 'items'],
  [FAQsVariation.FAQ_EIGHT]: ['title', 'items'],
  [FeatureVariation.FEATURE_ONE]: ['title', 'features'],
  [FeatureVariation.FEATURE_TWO]: [
    'title',
    'features',
    'button',
    'servicesTitle',
    'services',
  ],
  [FeatureVariation.FEATURE_THREE]: ['title', 'features', 'subTitle'],
  [FeatureVariation.FEATURE_FOUR]: ['title', 'features', 'image1', 'image2'],
  [FeatureVariation.FEATURE_FIVE]: ['title', 'features'],
  [FeatureVariation.FEATURE_SIX]: ['title', 'features'],
  [FeatureVariation.FEATURE_SEVEN]: ['title', 'features'],
  [FeatureVariation.FEATURE_EIGHT]: ['title', 'features'],
  [FeatureVariation.FEATURE_NINE]: ['title', 'features'],
  [FeatureVariation.FEATURE_TEN]: ['title', 'features', 'image'],
  [FeatureVariation.FEATURE_ELEVEN]: ['title', 'features'],
  [FeatureVariation.FEATURE_TWELVE]: ['title', 'features', 'postTitle'],
  [FeatureVariation.FEATURE_THIRTEEN]: [
    'title',
    'features',
    'subtitle',
    'description',
  ],
  [FooterVariation.FOOTER_ONE]: [
    'copyRights',
    'projectDescription',
    'socials',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_TWO]: ['copyRights', 'socials', 'menuStyle'],
  [FooterVariation.FOOTER_THREE]: [
    'copyRights',
    'socials',
    'email',
    'address',
    'number',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_FOUR]: [
    'copyRights',
    'socials',
    'email',
    'address',
    'number',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
    'menuStyle',
    'latestNewsImage1',
    'latestNewsImage2',
    'latestNewsText2',
  ],
  [FooterVariation.FOOTER_FIVE]: [
    'copyRights',
    'socials',
    'title',
    'button',
    'subtitle',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_SIX]: ['copyRights', 'projectName', 'menuStyle'],
  [FooterVariation.FOOTER_SEVEN]: [
    'copyRights',
    'projectName',
    'projectDescription',
    'button',
    'socials',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_EIGHT]: [
    'copyRights',
    'projectName',
    'socials',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_NINE]: [
    'copyRights',
    'projectDescription',
    'socials',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_TEN]: [
    'image',
    'projectDescription',
    'button',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_ELEVEN]: [
    'copyRights',
    'button',
    'socials',
    'title',
    'subtitle',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_TWELVE]: [
    'copyRights',
    'button',
    'socials',
    'title',
    'subtitle',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_THIRTEEN]: [
    'socials',
    'copyRights',
    'subtitle',
    'title',
    'menuStyle',
  ],
  [FooterVariation.FOOTER_FOURTEEN]: ['socials', 'copyRights', 'menuStyle'],
  [GalleryVariation.GALLERY_ONE]: [
    'title',
    'subtitle',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
    'image7',
    'image8',
    'image9',
  ],
  [GalleryVariation.GALLERY_TWO]: [
    'title',
    'description',
    'image1',
    'image2',
    'image3',
    'image4',
  ],
  [GalleryVariation.GALLERY_THREE]: [
    'title',
    'description',
    'image1',
    'image2',
    'image3',
    'image4',
  ],
  [GalleryVariation.GALLERY_FOUR]: [
    'title',
    'image1',
    'image2',
    'image3',
    'image4',
  ],
  [GalleryVariation.GALLERY_FIVE]: [
    'title',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
  ],
  [GalleryVariation.GALLERY_SIX]: [
    'title',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
  ],
  [GalleryVariation.GALLERY_SEVEN]: ['title', 'image', 'slides'],
  [HeroVariation.HERO_ONE]: ['title', 'description', 'image', 'button'],
  [HeroVariation.HERO_TWO]: ['title', 'description', 'button'],
  [HeroVariation.HERO_THREE]: ['title', 'description', 'button'],
  [HeroVariation.HERO_FOUR]: ['title', 'description', 'image', 'button'],
  [HeroVariation.HERO_FIVE]: [
    'tagline',
    'title',
    'description',
    'image',
    'button',
  ],
  [HeroVariation.HERO_SIX]: ['title', 'description', 'image', 'button'],
  [HeroVariation.HERO_SEVEN]: [
    'title',
    'tagline',
    'description',
    'backGroundImage',
    'mainImage',
    'button',
    'image1',
    'image2',
    'image3',
    'image4',
    'image5',
    'image6',
  ],

  [HeroVariation.HERO_EIGHT]: ['title', 'description', 'image', 'button'],
  [HeroVariation.HERO_NINE]: [
    'title',
    'description',
    'image',
    'button1',
    'button2',
  ],
  [HeroVariation.HERO_TEN]: ['title', 'tagline', 'image'],
  [HeroVariation.HERO_ELEVEN]: ['title', 'backgroundImage', 'image'],
  [HowItWorkVariation.HOW_IT_WORKS_ONE]: [
    'title',
    'stageDescription1',
    'stageTitle1',
    'stageTitle2',
    'stageDescription2',
    'stageTitle3',
    'stageDescription3',
    'stageTitle4',
    'stageDescription4',
  ],
  [MessageWithActionVariation.MESSAGE_WITH_ACTION_ONE]: [
    'projectDescription',
    'image',
    'button',
  ],
  [OurClientsVariation.OUR_CLIENTS_ONE]: [
    'titlePartOne',
    'titlePartTwo',
    'image',
    'clients',
  ],
  [OurSolutionVariation.OUR_SOLUTION_ONE]: ['title', 'image', 'items'],
  [OurSolutionVariation.OUR_SOLUTION_TWO]: ['title', 'postTitle', 'content'],
  [OurSolutionVariation.OUR_SOLUTION_THREE]: ['title', 'postTitle', 'content'],
  [OurSolutionVariation.OUR_SOLUTION_FOUR]: [
    'title',
    'description',
    'image',
    'solutions_1',
    'solutions_2',
    'solutions_3',
    'solutions_4',
  ],
  [PrivacyPoliceVariation.PRIVACY_POLICY_ONE]: [
    'title',
    'description',
    'items',
  ],
  [PrivacyPoliceVariation.PRIVACY_POLICY_TWO]: [
    'title',
    'subtitle',
    'parabraph1',
    'parabraph2',
  ],
  [PrivacyPoliceVariation.PRIVACY_POLICY_THREE]: [
    'title',
    'description',
    'items',
  ],
  [PrivacyPoliceVariation.PRIVACY_POLICY_FOUR]: [
    'title',
    'description',
    'items',
  ],
  [SliderVariation.SLIDER_ONE]: ['title', 'slides'],
  [SupscriptionVariation.SUBSCRIPTION_ONE]: ['title', 'subscriptions'],
  [SupscriptionVariation.SUBSCRIPTION_TWO]: [
    'title',
    'subtitle',
    'subscriptions',
  ],
  [SupscriptionVariation.SUBSCRIPTION_THREE]: [
    'title',
    'subtitle',
    'subscriptions',
  ],
  [SupscriptionVariation.SUBSCRIPTION_FOUR]: [
    'title',
    'subtitle',
    'subscriptions',
  ],
  [SupscriptionVariation.SUBSCRIPTION_FIVE]: [
    'title',
    'subtitle',
    'subscriptions',
  ],
  [SupscriptionVariation.SUBSCRIPTION_SIX]: [
    'title',
    'subtitle',
    'description',
    'subscriptions',
  ],
  [TeamVariation.TEAM_ONE]: ['title', 'subtitle', 'description', 'team'],
  [TeamVariation.TEAM_TWO]: ['title', 'description', 'team'],
  [TeamVariation.TEAM_THREE]: ['title', 'description', 'team'],
  [TeamVariation.TEAM_FOUR]: ['title', 'team'],
  [TermsAndServiceVariation.TERMS_AND_SERVICES_ONE]: [
    'title',
    'description',
    'items',
  ],
  [TermsAndServiceVariation.TERMS_AND_SERVICES_TWO]: [
    'title',
    'subtitle',
    'parabraph1',
    'parabraph2',
  ],
  [TermsAndServiceVariation.TERMS_AND_SERVICES_THREE]: [
    'title',
    'description',
    'items',
  ],
  [TermsAndServiceVariation.TERMS_AND_SERVICES_FOUR]: [
    'title',
    'description',
    'items',
  ],
  [TermsAndServiceVariation.TERMS_AND_SERVICES_FIVE]: ['items'],
};
