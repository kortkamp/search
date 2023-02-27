import sgMail from '@sendgrid/mail';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { logger } from '@shared/utils/logger';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
class SendGridMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
  public async sendMail({
    from,
    to,
    subject,
    template,
    variables,
  }: ISendMailDTO) {
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
      const info = await sgMail.send(message);
      logger.debug(info);
    } catch (err) {
      logger.error('Sendgrid', err);
      throw new ErrorsApp('Erro interno ao enviar o email', 500);
    }
  }
}

export { SendGridMailProvider };
