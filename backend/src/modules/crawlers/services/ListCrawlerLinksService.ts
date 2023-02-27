import { inject, injectable } from 'tsyringe';

import { IListCrawlerLinksDTO } from '../dtos/IListCrawlerLinksDTO';
import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  query: IListCrawlerLinksDTO;
}

@injectable()
class ListCrawlerLinksService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ query }: IRequest) {
    const { page = 1, per_page = 10 } = query;
    const [crawlerLinks, total] = await this.crawlerLinksRepository.getAll({
      ...query,
    });

    return {
      result: crawlerLinks,
      total_filtered: total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    };
  }
}

export { ListCrawlerLinksService };
