import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Palette {
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

@ObjectType()
export class ProjectSettings {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  projectId: string;

  @Field()
  logoType: string;

  @Field()
  logoValue: string;

  @Field()
  palette: Palette;

  @Field()
  fontFamily: string;
}
