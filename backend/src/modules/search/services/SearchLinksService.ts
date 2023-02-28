import { ICrawlerLinksRepository } from '@modules/crawlers/repositories/ICrawlerLinksRepository';
import { inject, injectable } from 'tsyringe';

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
