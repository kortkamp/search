import { authConfig } from '@config/auth';
import { IUser } from '@modules/users/models/IUser';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';

interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorsApp('Seu e-mail ou password está errado!', 403);
    }

    const checkPasswordMatch = await this.hashProvider.verify(
      user.password,
      password,
    );

    if (!checkPasswordMatch) {
      throw new ErrorsApp('Seu e-mail ou password está errado!', 403);
    }

    if (!user.active) {
      throw new ErrorsApp(
        'Usuário não está ativo, por favor contate o administrador',
        403,
      );
    }

    const token = sign({ role: user.role }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { CreateSessionService };
