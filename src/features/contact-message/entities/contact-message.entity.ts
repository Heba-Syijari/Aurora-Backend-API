import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContactMessage {
  @Field(() => Int)
  id: number;

  @Field()
  projectId: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  description: string;

  @Field(() => Date)
  createdAt: Date;
}
