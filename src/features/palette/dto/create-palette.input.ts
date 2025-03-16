import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreatePaletteInput {
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
