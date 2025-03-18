import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IsAdmin, Public, UserDecorator } from 'src/common/decorators';
import { ContactRequest } from 'src/datasource/entities/contact-request.entity';
import {
  CanDeleteContactRequest,
  CanReadContactRequest,
  CanUpdateContactRequest,
} from 'src/common/decorators/permissions/contact-request';
import { ContactRequestService } from './contact-request.service';
import { CreateContactRequestInput, UpdateContactRequestInput } from './dto';

@Resolver(() => ContactRequest)
export class ContactRequestResolver {
  constructor(private readonly contactRequestService: ContactRequestService) {}

  @Public()
  @Mutation(() => ContactRequest)
  createContactRequest(
    @Args('createContactRequestInput') input: CreateContactRequestInput,
  ) {
    return this.contactRequestService.create(input);
  }

  @IsAdmin()
  @CanReadContactRequest()
  @Query(() => [ContactRequest], { name: 'contactRequests' })
  findAll(@UserDecorator('id') adminId: string) {
    return this.contactRequestService.findAll({ adminId });
  }

  @IsAdmin()
  @CanReadContactRequest()
  @Query(() => ContactRequest, { name: 'contactRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactRequestService.findOne(id);
  }

  @IsAdmin()
  @CanUpdateContactRequest()
  @Mutation(() => ContactRequest)
  updateContactRequest(
    @Args('updateContactRequestInput') input: UpdateContactRequestInput,
  ) {
    return this.contactRequestService.update(input);
  }

  @IsAdmin()
  @CanDeleteContactRequest()
  @Mutation(() => ContactRequest)
  removeContactRequest(@Args('id', { type: () => Int }) id: number) {
    return this.contactRequestService.remove(id);
  }
}
