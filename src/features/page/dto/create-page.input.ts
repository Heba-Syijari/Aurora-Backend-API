import { Field, InputType } from '@nestjs/graphql';
import { ComponentInput } from 'src/features/components/dto/component.input';

@InputType()
export class CreatePageInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Boolean)
  generateAI?: boolean;

  @Field()
  projectId: string;

  @Field(() => [ComponentInput])
  sections?: ComponentInput[];
}
