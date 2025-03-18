import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PaletteInput {
  @Field()
  primary: string;

  @Field()
  secondary: string;

  @Field()
  neutral: string;

  @Field()
  titles: string;

  @Field()
  subTitles: string;
}

@InputType()
export class ProjectDesignInput {
  @Field()
  logoType: string;

  @Field()
  logoValue: string;

  @Field(() => PaletteInput)
  palette: PaletteInput;

  @Field()
  fontFamily: string;
}
