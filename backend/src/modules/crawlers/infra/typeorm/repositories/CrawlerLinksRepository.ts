import { IAllocateCrawlerLinksDTO } from '@modules/crawlers/dtos/IAllocateCrawlerLinksDTO';
import { ICreateCrawlerLinkDTO } from '@modules/crawlers/dtos/ICreateCrawlerLinkDTO';
import { IListCrawlerLinksDTO } from '@modules/crawlers/dtos/IListCrawlerLinksDTO';
import { ISearchLinkDTO } from '@modules/crawlers/dtos/ISearchLinkDTO';
import { ICrawlerLinksRepository } from '@modules/crawlers/repositories/ICrawlerLinksRepository';
import { In, LessThan, Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { CrawlerLink } from '../models/CrawlerLink';

class CrawlerLinksRepository implements ICrawlerLinksRepository {
  private ormRepository: Repository<CrawlerLink>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<CrawlerLink>(CrawlerLink);
  }

  public async create(data: ICreateCrawlerLinkDTO): Promise<CrawlerLink> {
    const newCrawlerLink = this.ormRepository.create(data);

    await this.ormRepository.save(newCrawlerLink);

    return newCrawlerLink;
  }

  public async getAll(
    query: IListCrawlerLinksDTO,
  ): Promise<[CrawlerLink[], number]> {
    const { page = 1, per_page = 10, ...where } = query;

    const take = per_page;
    const skip = page ? (page - 1) * per_page : 0;

    return this.ormRepository.findAndCount({
      where,
      take,
      skip,
      order: { created_at: 'ASC' },
    });
  }

  public async allocate(
    query: IAllocateCrawlerLinksDTO,
  ): Promise<[CrawlerLink[], number]> {
    const response = await this.ormRepository
      .createQueryBuilder('crawler_links')
      .where('crawler_links.crawled_at <= :crawled_before', {
        crawled_before: query.crawled_before,
      })
      .orWhere('crawler_links.crawled_at IS NULL')
      .take(query.total || 1)
      .orderBy(
        "CASE WHEN crawler_links.crawled_at IS NULL THEN DATE '0001-01-01' ELSE crawler_links.crawled_at END",
        'ASC',
      )

      .getMany();

    return [response, 0];
    return this.ormRepository.findAndCount({
      where: [
        { is_crawling: false, crawled_at: null },
        { is_crawling: false, crawled_at: LessThan(query.crawled_before) },
      ],
      take: query.total || 1,
      order: { crawled_at: 'ASC', created_at: 'ASC' },
    });
  }

  public async save(data: CrawlerLink): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async incrementReference(linkId: string): Promise<void> {
    await this.ormRepository.increment({ id: linkId }, 'references_number', 1);
  }

  public async findById(id: string): Promise<CrawlerLink | undefined> {
    const crawlerLink = await this.ormRepository.findOne({
      where: { id },
    });

    return crawlerLink;
  }

  public async findByUrl(url: string): Promise<CrawlerLink | undefined> {
    const crawlerLink = await this.ormRepository.findOne({
      where: { url },
    });

    return crawlerLink;
  }

  public async findManyByUrl(urls: string[]): Promise<CrawlerLink[]> {
    const crawlerLink = await this.ormRepository.find({
      where: { url: In(urls) },
    });

    return crawlerLink;
  }

  public async delete(crawlerLink: CrawlerLink): Promise<void> {
    await this.ormRepository.remove(crawlerLink);
  }

  public async search(
    params: ISearchLinkDTO,
  ): Promise<[CrawlerLink[], number]> {
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

export { CrawlerLinksRepository };
