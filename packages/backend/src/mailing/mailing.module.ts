import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurableModuleClass } from './mailing.definition';
import { MailingService } from './mailing.service';

@Module({ providers: [MailingService, ConfigService], exports: [MailingService] })
export class MailingModule extends ConfigurableModuleClass {}
