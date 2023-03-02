import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  linkId: string;
}

@injectable()
class ReleaseCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ linkId }: IRequest) {
    const crawlerLink = await this.crawlerLinksRepository.findById(linkId);

    if (!crawlerLink) {
      throw new ErrorsApp('Link do not exists', 400);
    }

    crawlerLink.is_crawling = false;

    await this.crawlerLinksRepository.save(crawlerLink);
  }
}

export { ReleaseCrawlerLinkService };
