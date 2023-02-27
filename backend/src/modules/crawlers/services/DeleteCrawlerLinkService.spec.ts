import 'reflect-metadata';

import ErrorsApp from '@shared/errors/ErrorsApp';

import { ICrawlerLink } from '../models/ICrawlerLink';
import FakeCrawlerLinksRepository from '../repositories/fakes/FakeCrawlerLinksRepository';
import { DeleteCrawlerLinkService } from './DeleteCrawlerLinkService';

let fakeCrawlerLinksRepository: FakeCrawlerLinksRepository;
let deleteCrawlerLinkService: DeleteCrawlerLinkService;
let crawlerLink: ICrawlerLink;

describe('DeleteCrawlerLink', () => {
  const newCrawlerLinkData = {
    name: 'crawlerLink1',
  };

  beforeEach(async () => {
    fakeCrawlerLinksRepository = new FakeCrawlerLinksRepository();

    deleteCrawlerLinkService = new DeleteCrawlerLinkService(fakeCrawlerLinksRepository);

    crawlerLink = await fakeCrawlerLinksRepository.create(newCrawlerLinkData);
  });

  it('should be able to delete a crawlerLink', async () => {
    const deleteCrawlerLinkResult = await deleteCrawlerLinkService.execute(crawlerLink.id);

    const crawlerLinks = await fakeCrawlerLinksRepository.getAll();

    expect(crawlerLinks).toHaveLength(0);

    expect(deleteCrawlerLinkResult).toBeUndefined();
  });

  it('should not be able to delete a crawlerLink if it does not exist', async () => {
    await expect(
      deleteCrawlerLinkService.execute('user non-existing'),
    ).rejects.toBeInstanceOf(ErrorsApp);
  });
});
