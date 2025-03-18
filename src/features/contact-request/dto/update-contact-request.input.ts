import { InputType, Field, Int } from '@nestjs/graphql';
import { TicketStatus } from 'src/types';

@InputType()
export class UpdateContactRequestInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  status?: TicketStatus;

  @Field({ nullable: true })
  assigneeId?: string;
}
