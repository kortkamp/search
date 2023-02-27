import { container } from 'tsyringe';

import { MailTrapMailProvider } from './implementations/MailTrapMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';
import { SesMailProvider } from './implementations/SesMailProvider';
import { IMailProvider } from './models/IMailProvider';

const mailProvider = {
  MailTrap: MailTrapMailProvider,
  SendGrid: SendGridMailProvider,
  SES: SesMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER] || mailProvider.MailTrap,
);
