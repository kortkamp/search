import { inject, injectable } from 'tsyringe';

import { ICrawlerLinkCategoriesRepository } from '../repositories/ICrawlerLinkCategoriesRepository';

@injectable()
class ListCrawlerLinkCategoriesService {
  constructor(
    @inject('CrawlerLinkCategoriesRepository')
    private crawlerLinkCategoriesRepository: ICrawlerLinkCategoriesRepository,
  ) {}
  public async execute() {
    const categories = await this.crawlerLinkCategoriesRepository.getAll();

    return categories;
  }
}

export { ListCrawlerLinkCategoriesService };
