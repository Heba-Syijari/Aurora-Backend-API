import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TicketStatus } from 'src/types';

@ObjectType()
class ContactRequestAssignee {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class ContactRequest {
  @Field(() => Int)
  id: number;

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

  @Field({ nullable: true })
  assigneeId?: string;

  @Field(() => ContactRequestAssignee, { nullable: true })
  assignee?: ContactRequestAssignee;

  @Field()
  status: TicketStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
