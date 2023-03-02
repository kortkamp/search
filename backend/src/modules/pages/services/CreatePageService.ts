import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreatePageDTO } from '../dtos/ICreatePageDTO';
import { IPagesRepository } from '../repositories/IPagesRepository';

interface IRequest {
  data: ICreatePageDTO;
}

@injectable()
class CreatePageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
  ) {}
  public async execute({ data }: IRequest) {
    const crawlerLink = await this.pagesRepository.findByUrl(data.url);

    if (crawlerLink) {
      throw new ErrorsApp('Page Already Exists', 400);
    }

    const page = await this.pagesRepository.create(data);

    return page;
  }
}

export { CreatePageService };
