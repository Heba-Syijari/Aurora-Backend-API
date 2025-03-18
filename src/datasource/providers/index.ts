import { componentPageRepositoryProvider } from './component-page-repository.provider';
import { componentRepositoryProvider } from './component-repository.provider';
import { contactMessageRepositoryProvider } from './contact-message-repository.provider';
import { contactRequestRepositoryProvider } from './contact-request-repository.provider';
import { domainRegistrationRepositoryProvider } from './domain-registration-repository.provider';
import { mediaRepositoryProvider } from './media-repository.provider';
import { menuRepositoryProvider } from './menu-repository.provider';
import { notificationRepositoryProvider } from './notification-repository.provider';
import { notificationTemplateRepositoryProvider } from './notification-template-repository.provider';
import { pageRepositoryProvider } from './page-repository.provider';
import { paletteRepositoryProvider } from './palette-repository.provider';
import { paymentRepositoryProvider } from './payment-repository.provider';
import { planRepositoryProvider } from './plan-repository.provider';
import { pluginRepositoryProvider } from './plugin-repository.provider';
import { postRepositoryProvider } from './post-repository.provider';
import { projectGenerationRepositoryProvider } from './project-generation-repository.provider';
import { projectRepositoryProvider } from './project-repository.provider';
import { roleRepositoryProvider } from './role-repository.provider';
import { subscriptionRepositoryProvider } from './subscription-repository.provider';
import { ticketRepositoryProvider } from './ticket-repository.provider';
import { userRepositoryProvider } from './user-repository.provider';

export const datasourceProviders = [
  paletteRepositoryProvider,
  projectRepositoryProvider,
  pageRepositoryProvider,
  componentPageRepositoryProvider,
  componentRepositoryProvider,
  postRepositoryProvider,
  ticketRepositoryProvider,
  contactRequestRepositoryProvider,
  contactMessageRepositoryProvider,
  pluginRepositoryProvider,
  domainRegistrationRepositoryProvider,
  menuRepositoryProvider,
  mediaRepositoryProvider,
  notificationRepositoryProvider,
  notificationTemplateRepositoryProvider,
  roleRepositoryProvider,
  planRepositoryProvider,
  subscriptionRepositoryProvider,
  paymentRepositoryProvider,
  userRepositoryProvider,
  projectGenerationRepositoryProvider,
];
