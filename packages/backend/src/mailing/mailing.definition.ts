import { ConfigurableModuleBuilder } from '@nestjs/common';

import { Templates } from './mailing.service';

export interface MailingModuleOptions {
  templates: Templates;
  apiKey: string;
  mailServiceUrl: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<MailingModuleOptions>({
  moduleName: 'Mailing',
}).build();
