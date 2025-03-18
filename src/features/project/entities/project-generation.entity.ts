import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProjectGenerationStatusVariation } from 'src/types';

@ObjectType()
export class ProjectGeneration {
  @Field(() => Int)
  id: number;

  @Field()
  projectId: string;

  @Field()
  status: ProjectGenerationStatusVariation;

  @Field({ nullable: true })
  logs?: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => Date)
  createdAt: Date;
}
