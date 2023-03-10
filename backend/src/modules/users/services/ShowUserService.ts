import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  authUser: {
    id: string;
    role: string;
  };
}
@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ userId }: IRequest): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('Usuário não encontrado', 404);
    }

    return user;
  }
}

export { ShowUserService };
