export type ContentGenerationsType = 'text' | 'image';

export type PostsContent = {
  items: PostItem[];
};

export type PostItem = {
  title: string;
  description: string;
  body: string;
  image: string;
  imageAlt?: string;
};

// --------------------- Hero ---------------------

export type HeroOneContent = {
  title: string;
  description: string;
  image: string;
};
export type HeroTwoContent = Omit<HeroOneContent, 'image'>;

export type HeroThreeContent = HeroTwoContent;

export type HeroFourContent = HeroOneContent;

export type HeroFiveContent = HeroOneContent & { tagline: string };
export type HeroSixContent = HeroOneContent;
export type HeroSevenContent = {
  tagline: string;
  title: string;
  description: string;
  backGroundImage: string;
  images: string[];
  mainImage: string;
};
export type HeroEightContent = HeroOneContent;
export type HeroNineContent = HeroOneContent;
export type HeroTenContent = {
  tagline: string;
  title: string;
  image: string;
};
export type HeroElevenContent = {
  backgroundImage: string;
  title: string;
  image: string;
};

export type HeroContent =
  | HeroOneContent
  | HeroTwoContent
  | HeroThreeContent
  | HeroFourContent
  | HeroFiveContent
  | HeroSixContent
  | HeroSevenContent
  | HeroEightContent
  | HeroNineContent
  | HeroTenContent
  | HeroElevenContent;

// --------------------- About ---------------------

export type AboutTwoContent = {
  subtitle: string;
  image: string;
  title: string;
  description: string;
};
export type AboutOneContent = Omit<AboutTwoContent, 'image'>;
export type AboutThreeContent = Omit<AboutTwoContent, 'subtitle'>;
export type AboutFourContent = {
  title: string;
  cardOneTitle: string;
  cardTwoTitle: string;
  cardOneDescription: string;
  cardTwoDescription: string;
  subtitle: string;
  description: string;
  cardOneImage: string;
  cardTwoImage: string;
  image: string;
};
export type AboutFiveContent = {
  title: string;
  postTitle: string;
  image: string;
  itemtext1: string;
  itemtext2: string;
  itemtext3: string;
};
export type AboutSixContent = {
  descriptionOne: string;
  descriptionTwo: string;
  descriptionThree: string;
  image: string;
};
export type AboutSevenContent = {
  description: string;
  itemtext1: string;
  itemtext2: string;
  itemtext3: string;
  image: string;
};
export type AboutContent =
  | AboutOneContent
  | AboutTwoContent
  | AboutThreeContent
  | AboutFourContent
  | AboutFiveContent
  | AboutSixContent
  | AboutSevenContent;

// --------------------- FAQ ---------------------

export type FAQsContent = {
  title: string;
  description: string;
  items: FAQsItem[];
};
export type FAQsEightContent = Omit<FAQsContent, 'description'>;

export type FAQsItem = {
  question: string;
  answer: string;
};
//----------------------blog---------------------------
export type BlogContent = {
  title: string;
  description: string;
};
//---------------------Feature--------------------------
export type FeatureOneContent = {
  title: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  title4: string;
  description4: string;
};

export type FeatureTwoContent = FeatureOneContent & {
  servicesTitle: string;
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  service5: string;
};

export type FeatureThreeContent = {
  title: string;
  subTitle: string;
  title1: string;
  description1: string;
  image1: string;
  title2: string;
  description2: string;
  image2: string;
  title3: string;
  description3: string;
  image3: string;
};

export type FeatureFourContent = {
  title: string;
  title1: string;
  description1: string;
  image1: string;
  title2: string;
  description2: string;
  image2: string;
  title3: string;
  description3: string;
  title4: string;
  description4: string;
};
export type FeatureFiveContent = Omit<
  FeatureOneContent,
  'title4' | 'description4'
>;
export type FeatureSixContent = FeatureOneContent;
export type FeatureSevenContent = FeatureOneContent;
export type FeatureEightContent = FeatureOneContent;
export type FeatureNineContent = FeatureOneContent;
export type FeatureTenContent = FeatureOneContent & { image: string };
export type FeatureElevenContent = FeatureOneContent & {
  title5: string;
  description5: string;
  title6: string;
  description6: string;
};
export type FeatureTwelveContent = FeatureElevenContent & { postTitle: string };
export type FeatureThirteenContent = FeatureElevenContent & {
  subtitle: string;
  description: string;
};

export type FeatureContent =
  | FeatureOneContent
  | FeatureTwoContent
  | FeatureThreeContent
  | FeatureFourContent
  | FeatureFiveContent
  | FeatureSixContent
  | FeatureSevenContent
  | FeatureEightContent
  | FeatureNineContent
  | FeatureTenContent
  | FeatureElevenContent
  | FeatureTwelveContent
  | FeatureThirteenContent;
//-----------------------how it works----------------------
export type WorkContent = FeatureOneContent;
//------------------------Slider----------------------------
export type SliderContent = {
  title: string;
  title1: string;
  subtitle1: string;
  description1: string;
  image1: string;
  title2: string;
  subtitle2: string;
  description2: string;
  image2: string;
};
//-------------------Privacy Policy--------------------
export type PrivacyPolicyOneContent = {
  title: string;
  description: string;
  items: PrivacyPolicyItem[];
};
export type PrivacyPolicyItem = {
  title: string;
  description: string;
};
export type PrivacyPolicyTwoContent = {
  title: string;
  parabraph1: string;
  subtitle: string;
  parabraph2: string;
};

export type PrivacyPolicyThreeContent = PrivacyPolicyOneContent;

export type PrivacyPolicyFourContent = PrivacyPolicyOneContent;

export type PrivacyPolicyContent =
  | PrivacyPolicyOneContent
  | PrivacyPolicyTwoContent
  | PrivacyPolicyThreeContent
  | PrivacyPolicyFourContent;
//------------------------Terms AndS ervice----------------------

export type TermsAndServiceOneContent = PrivacyPolicyOneContent;
export type TermsAndServiceTwoContent = PrivacyPolicyTwoContent;
export type TermsAndServiceThreeContent = TermsAndServiceOneContent;
export type TermsAndServiceFourContent = TermsAndServiceOneContent;
export type TermsAndServiceFiveContent = TermsAndServiceOneContent;

export type TermsAndServiceContent =
  | TermsAndServiceOneContent
  | TermsAndServiceTwoContent
  | TermsAndServiceThreeContent
  | TermsAndServiceFourContent
  | TermsAndServiceFiveContent;
