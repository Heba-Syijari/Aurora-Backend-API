import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DomainRegistration } from 'src/datasource/entities/domain-registration.entity';

@ObjectType()
export class ProjectDomainRegistration {
  @Field(() => Int)
  domainRegistrationId: number;

  @Field()
  projectId: string;

  @Field(() => DomainRegistration)
  domainRegistration?: DomainRegistration;
}
