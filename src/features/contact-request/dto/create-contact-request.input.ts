import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactRequestInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  subject: string;

  @Field()
  description: string;
}
