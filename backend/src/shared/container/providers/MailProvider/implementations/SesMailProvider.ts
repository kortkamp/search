import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { logger } from '@shared/utils/logger';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

class SesMailProvider implements IMailProvider {
  private client: SESClient;
  constructor() {
    this.client = new SESClient({ region: process.env.AWS_SES_REGION });
  }
  public async sendMail({
    from,
    to,
    subject,
    template,
    variables,
  }: ISendMailDTO) {
    // while SES Account is in SandBox mode
    // const destination = '';

    const sendMailCommand = new SendTemplatedEmailCommand({
      Destination: { ToAddresses: [to] },
      TemplateData: JSON.stringify(variables),
      Source: from,
      Template: template,
    });

    try {
      const result = await this.client.send(sendMailCommand);
      logger.debug(result);
    } catch (err) {
      logger.error('Ses', err);
      throw new ErrorsApp('Erro interno ao enviar o email', 500);
    }
  }
}

export { SesMailProvider };
