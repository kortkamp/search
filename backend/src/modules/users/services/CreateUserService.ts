import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import crypto from 'crypto';
import { injectable, inject } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import { ISendMailDTO } from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IUserTokensRepository } from '../repositories/IUserTokensRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(data.email);

    if (emailExists) {
      throw new ErrorsApp('Este e-mail já está em uso', 409);
    }

    const userMustDefinePassword = !data.password;

    const password = userMustDefinePassword
      ? crypto.randomBytes(10).toString('hex')
      : data.password;

    const hashedPassword = await this.hashProvider.create(password, 8);

    Object.assign(data, { password: hashedPassword, active: true });

    const user = await this.usersRepository.create(data);

    const userToken = await this.userTokensRepository.generate(user.id);

    const link = userMustDefinePassword
      ? `${process.env.RESET_PASSWORD_URL}${userToken.token}`
      : `${process.env.CONFIRM_USER_URL}${userToken.token}`;

    const message: ISendMailDTO = {
      to: user.email,
      from: 'APAE Admin <no-reply@apaeadmin.com.br>',
      subject: userMustDefinePassword
        ? 'Definição de senha em APAE Admin'
        : 'Confirmação de cadastro em APAE Admin',
      template: userMustDefinePassword
        ? 'SetPasswordAPAE'
        : 'ResetPasswordAPAE',
      variables: { link },
    };

    if (userMustDefinePassword) {
      await this.mailProvider.sendMail(message);
    }

    return user;
  }
}

export { CreateUserService };
