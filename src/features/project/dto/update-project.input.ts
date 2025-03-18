import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateProjectInput, ProjectDesignInput } from './create-project';

@InputType()
class UpdateProjectDesignInput extends ProjectDesignInput {}

@InputType()
export class UpdateProjectInput extends PartialType(
  OmitType(CreateProjectInput, ['design']),
) {
  @Field()
  id: string;

  @Field(() => UpdateProjectDesignInput, { nullable: true })
  design?: UpdateProjectDesignInput;

  @Field({ nullable: true })
  volume?: string;
}
