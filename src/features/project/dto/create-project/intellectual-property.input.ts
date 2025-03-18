import { InputType, Field } from '@nestjs/graphql';
import { IntellectualPropertyType } from 'src/types';

@InputType()
export class IntellectualPropertyInput {
  @Field()
  type: IntellectualPropertyType;

  // for all
  @Field()
  contactEmail: string;

  @Field(() => [String], { nullable: true })
  relatedLinks?: string[];

  // for personal and organizational only
  @Field({ nullable: true })
  contactNumber?: string;

  // for personal
  @Field({ nullable: true })
  bio?: string;

  // for organizational
  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  location?: string;
}
