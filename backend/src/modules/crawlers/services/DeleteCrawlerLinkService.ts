import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  crawlerLinkId: string;
}

@injectable()
class DeleteCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ crawlerLinkId }: IRequest) {
    const crawlerLink = await this.crawlerLinksRepository.findById(
      crawlerLinkId,
    );
    if (!crawlerLink) {
      throw new ErrorsApp('O crawlerLink não existe', 400);
    }

    await this.crawlerLinksRepository.delete(crawlerLink);
  }
}

export { DeleteCrawlerLinkService };
