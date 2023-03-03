import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { logger } from '@shared/utils/logger';

import { ICrawlersRepository } from '../repositories/ICrawlersRepository';

interface IRequest {
  crawlerId: string;
}

@injectable()
class UnregisterCrawlerService {
  constructor(
    @inject('CrawlersRepository')
    private crawlersRepository: ICrawlersRepository,
  ) {}
  public async execute({ crawlerId }: IRequest) {
    const crawler = await this.crawlersRepository.findById(crawlerId);

    if (!crawler) {
      throw new ErrorsApp('Crawler does not exists');
    }

    crawler.running_instances -= 1;

    await this.crawlersRepository.save(crawler);

    logger.info(`Crawler ${crawler.name} unregistered!`);

    return crawler;
  }
}

export { UnregisterCrawlerService };
