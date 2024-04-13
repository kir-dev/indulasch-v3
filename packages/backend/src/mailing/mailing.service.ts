import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as ejs from 'ejs';
import { existsSync, readFileSync } from 'fs';

import { MailingModuleOptions, MODULE_OPTIONS_TOKEN } from './mailing.definition';
import { MailingModule } from './mailing.module';

export type Templates = Record<string, string> & { default: string };

interface SendMail {
  to: string;
  from: string;
  subject: string;
  html: string;
}

class SetupIncompleteException extends Error {
  message = `You need to set up ${MailingService.name} through ${MailingModule.name} in order to properly use it!`;
}

class TemplateNotFoundException extends Error {
  constructor(templateName: string) {
    super(`Template "${templateName}" not found. Check the setup process!`);
  }
}

@Injectable()
export class MailingService {
  templates: Templates = { default: '' };
  setupComplete = false;
  mailServerUrl: string | undefined;
  apiKey: string | undefined;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: MailingModuleOptions) {
    this.templates = Object.entries(options.templates).reduce(
      (accumulator: Templates, [name, path]) => {
        if (!existsSync(path)) throw new Error(`Template not found for ${name}`);
        accumulator[name] = readFileSync(path).toString();
        return accumulator;
      },
      { default: readFileSync(options.templates.default).toString() }
    );
    this.mailServerUrl = options.mailServiceUrl;
    this.apiKey = options.apiKey;
    if (!this.apiKey) throw 'API key is not provided for Mailing Service';
    if (!this.mailServerUrl) throw 'Mail server URL is not provided for Mailing Service';
    this.setupComplete = true;
    Logger.log(`Loaded ${Object.keys(options.templates).length} e-mail template(s)`, MailingService.name);
  }

  /**
   * Generates an HTML code for the given template filled in with values you provide.
   * @param values - The values you might refer to in your EJS file. This is not type checked!
   * @param templateName - One of the template names you provided during the setup process.
   */
  generateMail(values: unknown, templateName: keyof typeof this.templates = 'default') {
    this.checkSetup();

    const template = this.templates[templateName];
    if (!template) throw new TemplateNotFoundException(templateName);

    return ejs.render(this.templates[templateName], values);
  }

  /**
   * Sends a mail through the mailing delivery service provided in the setup process.
   * @param {SendMail[]} data - Array of objects containing to, from, subject and html string fields.
   */
  sendMail(data: SendMail[]) {
    this.checkSetup();
    return axios
      .post(this.mailServerUrl, data, {
        headers: { 'X-Api-Key': this.apiKey },
      })
      .then(() => true)
      .catch(() => false);
  }

  private checkSetup() {
    if (!this.setupComplete) throw new SetupIncompleteException();
  }
}
