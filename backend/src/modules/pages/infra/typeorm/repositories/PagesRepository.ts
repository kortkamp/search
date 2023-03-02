import { ISearchLinkDTO } from '@modules/crawlers/dtos/ISearchLinkDTO';
import { ICreatePageDTO } from '@modules/pages/dtos/ICreatePageDTO';
import { IPagesRepository } from '@modules/pages/repositories/IPagesRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Page } from '../models/Page';

class PagesRepository implements IPagesRepository {
  private ormRepository: Repository<Page>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Page>(Page);
  }

  public async create(data: ICreatePageDTO): Promise<Page> {
    const newPage = this.ormRepository.create(data);

    await this.ormRepository.save(newPage);

    return newPage;
  }

  public async save(data: Page): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async incrementReference(linkId: string): Promise<void> {
    await this.ormRepository.increment({ id: linkId }, 'references_number', 1);
  }

  public async findById(id: string): Promise<Page | undefined> {
    const Page = await this.ormRepository.findOne({
      where: { id },
    });

    return Page;
  }

  public async findByUrl(url: string): Promise<Page | undefined> {
    const Page = await this.ormRepository.findOne({
      where: { url },
    });

    return Page;
  }

  public async delete(page: Page): Promise<void> {
    await this.ormRepository.remove(page);
  }

  public async search(params: ISearchLinkDTO): Promise<[Page[], number]> {
    const { page = 1, per_page = 10, query } = params;

    const take = per_page;
    const skip = page ? (page - 1) * per_page : 0;
    const search = query.join(' & ');

    const qb = this.ormRepository.createQueryBuilder('links');
    const result = await qb
      .select(['links.id', 'links.url', 'links.title', 'links.description'])
      // .where(`search_index_col @@ to_tsquery('portuguese', :search)`, {
      //   search,
      // })
      .where(
        `ts_rank(search_index_col, to_tsquery('portuguese', :search)) > 0.05`,
        {
          search,
        },
      )
      .orderBy(
        `ts_rank(search_index_col, to_tsquery('portuguese', :search))`,
        'DESC',
      )
      .setParameter('search', search)
      .take(take)
      .skip(skip)
      .getManyAndCount();
    return result;
  }
}

export { PagesRepository };
