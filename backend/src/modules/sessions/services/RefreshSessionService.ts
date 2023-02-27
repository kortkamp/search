import { authConfig } from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';
import ErrorsApp from '@shared/errors/ErrorsApp';

interface IResponse {
  token: string;
}

interface IRequest {
  userId: string;
}
@injectable()
class RefreshSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) {
      throw new ErrorsApp('O usuário não existe!', 403);
    }

    if (!userExists.active) {
      throw new ErrorsApp(
        'Usuário não está ativo, por favor contate o administrador',
        403,
      );
    }

    const token = sign({ role: userExists.role }, authConfig.jwt.secret, {
      subject: userExists.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      token,
    };
  }
}

export { RefreshSessionService };
