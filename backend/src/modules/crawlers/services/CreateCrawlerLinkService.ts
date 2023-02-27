import { inject, injectable } from 'tsyringe';

import { ICrawlerLinksRepository } from '../repositories/ICrawlerLinksRepository';

interface IRequest {
  urls: string[];
}

@injectable()
class CreateCrawlerLinkService {
  constructor(
    @inject('CrawlerLinksRepository')
    private crawlerLinksRepository: ICrawlerLinksRepository,
  ) {}
  public async execute({ urls }: IRequest) {
    const cleanUrls = urls.map(url => {
      if (url.endsWith('/')) {
        return url.slice(0, -1);
      }
      return url;
    });

    const alreadyKnownLinks = await this.crawlerLinksRepository.findManyByUrl(
      cleanUrls,
    );

    const knownUrls = alreadyKnownLinks.map(knownLink => knownLink.url);

    const newUrls = cleanUrls.filter(url => !knownUrls.includes(url));

    const newUrlsWithoutDuplicates = newUrls.filter(
      (item, index) => newUrls.indexOf(item) === index,
    );

    const newLinksData = newUrlsWithoutDuplicates.map(newUrl => ({
      url: newUrl,
    }));

    const updatedLinks = alreadyKnownLinks.map(knownLink => ({
      ...knownLink,
      references_number: knownLink.references_number + 1,
    }));

    await this.crawlerLinksRepository.create(newLinksData);

    await this.crawlerLinksRepository.save(updatedLinks);
  }
}

export { CreateCrawlerLinkService };
