import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegenerateTextInput {
  @Field()
  projectId: string;

  @Field()
  sectionType: string;

  @Field()
  itemType: string;
}
