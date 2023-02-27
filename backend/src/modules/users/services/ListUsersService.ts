import { injectable, inject } from 'tsyringe';

import { IListUsersDTO } from '../dtos/IListUsersDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  query: IListUsersDTO;
}
@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ query }: IRequest) {
    const { page, per_page } = query;
    const [users, length] = await this.usersRepository.getAll(query);

    return {
      result: users,
      total_filtered: length,
      page,
      per_page,
      total_pages: Math.ceil(length / per_page),
    };
  }
}

export { ListUsersService };
