import { inject, injectable } from 'tsyringe';

import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  page: number;
  per_page: number;
  search: string;
}

@injectable()
class SearchLinksService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ page = 1, per_page = 10, search }: IRequest) {
    console.log(page, per_page, search.split(' '));
    const [crawlerLinks, total] = await this.crawlerLinksRepository.search({
      page,
      per_page,
      query: search.split(' '),
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

export { SearchLinksService };
