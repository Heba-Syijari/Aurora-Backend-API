import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JSONScalar } from 'src/common/graphql/scalars';
import { Component } from 'src/features/components/entities/component.entity';

@ObjectType()
export class PageComponent {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  componentId: number;

  @Field(() => Int)
  pageId: number;

  @Field(() => JSONScalar)
  data: any;

  @Field(() => [String], { nullable: true })
  elements?: string[];

  @Field(() => Int)
  order: number;

  @Field(() => Component, { nullable: true })
  component?: Component;
}
