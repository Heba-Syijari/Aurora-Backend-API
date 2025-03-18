import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactMessageService } from './contact-message.service';
import { ContactMessage } from './entities/contact-message.entity';
import { RemoveContactMessageInput } from './dto/remove-contact-message.input';

@Resolver(() => ContactMessage)
export class ContactMessageResolver {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @Query(() => [ContactMessage], { name: 'contactMessages' })
  findAll(@Args('projectId', { type: () => String }) projectId: string) {
    return this.contactMessageService.findAll(projectId);
  }

  @Mutation(() => ContactMessage)
  removeContactMessage(
    @Args('removeContactMessageInput') input: RemoveContactMessageInput,
  ) {
    return this.contactMessageService.remove(input);
  }
}
