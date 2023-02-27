import nodemailer from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { logger } from '@shared/utils/logger';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
class MailTrapMailProvider implements IMailProvider {
  private transportConfigs = {};

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.transportConfigs = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
      },
    };
  }
  public async sendMail({
    from,
    to,
    subject,
    template,
    variables,
  }: ISendMailDTO) {
    const transport = nodemailer.createTransport(this.transportConfigs);

    const templateHTML = await this.mailTemplateProvider.parse({
      template,
      variables,
    });

    const message = {
      from,
      to,
      subject,
      html: templateHTML,
    };

    try {
      const info = await transport.sendMail(message);
      logger.debug(info);
    } catch (err) {
      logger.error('Mailtrap', err);
    }
  }
}

export { MailTrapMailProvider };
