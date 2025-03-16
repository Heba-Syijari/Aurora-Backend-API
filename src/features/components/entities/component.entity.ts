import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ComponentType } from '@prisma/client';
@ObjectType()
export class Component {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  type: ComponentType;

  @Field()
  image: string;
}
