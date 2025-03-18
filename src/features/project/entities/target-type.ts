import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProjectTargetType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  imageUrl: string;
}
