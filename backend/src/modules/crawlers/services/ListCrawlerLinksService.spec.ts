import 'reflect-metadata';

import { ICreateCrawlerLinkDTO } from '../dtos/ICreateCrawlerLinkDTO';
import FakeCrawlerLinksRepository from '../repositories/fakes/FakeCrawlerLinksRepository';
import { ListCrawlerLinksService } from './ListCrawlerLinksService';

let fakeCrawlerLinksRepository: FakeCrawlerLinksRepository;

let listCrawlerLinksService: ListCrawlerLinksService;

let crawlerLinkData: ICreateCrawlerLinkDTO;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeCrawlerLinksRepository = new FakeCrawlerLinksRepository();

    listCrawlerLinksService = new ListCrawlerLinksService(fakeCrawlerLinksRepository);

    crawlerLinkData = {
      name: 'crawlerLink1',
    };
  });

  it('Should be able to list crawlerLinks', async () => {
    const crawlerLink1 = await fakeCrawlerLinksRepository.create(crawlerLinkData);

    const crawlerLink2 = await fakeCrawlerLinksRepository.create({
      ...crawlerLinkData,
      name: 'crawlerLink2',
    });

    const crawlerLinks = await listCrawlerLinksService.execute();

    expect(crawlerLinks).toEqual([crawlerLink1, crawlerLink2]);
  });
});
