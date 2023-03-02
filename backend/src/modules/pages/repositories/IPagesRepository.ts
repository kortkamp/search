import { ICreatePageDTO } from '../dtos/ICreatePageDTO';
import { ISearchPageDTO } from '../dtos/ISearchPageDTO';
import { IPage } from '../models/IPage';

interface IPagesRepository {
  create(data: ICreatePageDTO): Promise<IPage>;
  findById(linkId: string): Promise<IPage | undefined>;
  findByUrl(url: string): Promise<IPage | undefined>;
  save(dataUpdate: IPage): Promise<void>;
  delete(user: IPage): Promise<void>;
  search(params: ISearchPageDTO): Promise<[IPage[], number]>;
}

export { IPagesRepository };
