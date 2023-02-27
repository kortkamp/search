import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IListUsersDTO } from '../dtos/IListUsersDTO';
import { IUser } from '../models/IUser';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  getAll(query: IListUsersDTO): Promise<[IUser[], number]>;
  findById(userId: string, relations?: string[]): Promise<IUser | undefined>;
  findByEmail(email: string, relations?: string[]): Promise<IUser | undefined>;
  save(dataUpdate: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
  getTotal(): Promise<number>;
}

export { IUsersRepository };
