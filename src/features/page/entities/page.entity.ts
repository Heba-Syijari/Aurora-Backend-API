import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PageComponent } from 'src/features/page/entities/page-component.entity';

@ObjectType()
export class Page {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  slug?: string;


  @Field()
  projectId: string;

  @Field(() => [PageComponent], { nullable: true })
  components?: PageComponent[];
}
