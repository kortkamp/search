import { injectable, inject } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IUser } from '../models/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  authUserId: string;
  active: boolean;
}

@injectable()
class SetUserActiveService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    authUserId,
    active,
  }: IRequest): Promise<IUser> {
    if (authUserId === userId) {
      throw new ErrorsApp('Usuário não pode trocar seu próprio estado', 403);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ErrorsApp('Usuário não encontrado', 404);
    }

    user.active = active;

    await this.usersRepository.save(user);

    return user;
  }
}

export { SetUserActiveService };
