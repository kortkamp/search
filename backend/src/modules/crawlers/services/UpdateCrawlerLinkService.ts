import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICreateCrawlerLinkDTO } from '../dtos/ICreateCrawlerLinkDTO';
import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  data: Partial<ICreateCrawlerLinkDTO>;
  crawlerLinkId: string;
}

@injectable()
class UpdateCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ data, crawlerLinkId }: IRequest) {
    const tenant = await this.crawlerLinksRepository.findById(crawlerLinkId);

    if (!tenant) {
      throw new ErrorsApp('CrawlerLink não encontrado', 404);
    }

    Object.assign(tenant, data);

    await this.crawlerLinksRepository.save(tenant);

    return tenant;
  }
}

export { UpdateCrawlerLinkService };
