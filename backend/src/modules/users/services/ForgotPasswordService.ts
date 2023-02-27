import path from 'path';
import { injectable, inject } from 'tsyringe';

import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(email: string): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorsApp('E-mail não encontrado!', 404);
    }

    if (!user.active) {
      throw new ErrorsApp(
        'Usuário não está ativo, contate o administrador!',
        403,
      );
    }

    const userToken = await this.userTokensRepository.generate(user.id);

    const link = `${process.env.RESET_PASSWORD_URL}${userToken.token}`;

    const message: ISendMailDTO = {
      to: email,
      from: 'APAE Admin <no-reply@apaeadmin.com.br>',
      subject: 'Solicitação de troca de senha',
      template: 'ResetPasswordAPAE',
      variables: { link },
    };

    await this.mailProvider.sendMail(message);

    return user;
  }
}

export { ForgotPasswordService };
