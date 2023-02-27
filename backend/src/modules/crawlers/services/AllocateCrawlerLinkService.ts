import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

const MIN_AGE_TO_RE_CRAWLE = 1000000;

@injectable()
class AllocateCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute() {
    const minCrawledAt = moment(new Date())
      .subtract(MIN_AGE_TO_RE_CRAWLE, 'ms')
      .toDate();

    // console.log('now', new Date());
    // console.log('minCrawledAt', minCrawledAt);
    const [crawlerLinks] = await this.crawlerLinksRepository.allocate({
      total: 1,
      crawled_before: minCrawledAt,
    });

    if (crawlerLinks.length === 0) {
      return [];
    }

    const allocatedLinks = crawlerLinks.map(link => ({
      ...link,
      is_crawling: true,
      crawled_at: new Date(),
    }));

    await this.crawlerLinksRepository.save(allocatedLinks);

    const links = crawlerLinks.map(link => ({ url: link.url, id: link.id }));

    return links;
  }
}

export { AllocateCrawlerLinkService };
