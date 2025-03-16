import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Palettes {
  @Field()
  id: string;

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

  @Field({ nullable: true })
  userId: string;
}
