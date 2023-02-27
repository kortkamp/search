import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { IReleaseCrawlerLink } from '../dtos/IReleaseCrawlerLink';
import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  linkId: string;
  data: IReleaseCrawlerLink;
}

@injectable()
class ReleaseCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ linkId, data }: IRequest) {
    const crawlerLink = await this.crawlerLinksRepository.findById(linkId);

    if (!crawlerLink) {
      throw new ErrorsApp('Link do not exists', 400);
    }

    crawlerLink.is_crawling = false;

    Object.assign(crawlerLink, data);

    await this.crawlerLinksRepository.save(crawlerLink);
  }
}

export { ReleaseCrawlerLinkService };
