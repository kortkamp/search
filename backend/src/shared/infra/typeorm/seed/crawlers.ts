import 'dotenv/config';

import { v4 as uuid } from 'uuid';
import { CrawlersRepository } from '@modules/crawlers/infra/typeorm/repositories/CrawlersRepository';
import { ICreateCrawlerDTO } from '@modules/crawlers/dtos/ICreateCrawlerDTO';

import { AppDataSource } from '..';

async function create() {
  await AppDataSource.initialize();
  const crawlersRepository = new CrawlersRepository();

  const crawler: ICreateCrawlerDTO = {
    name: 'General Crawler',
    auth_token: uuid(),
  };

  console.log(crawler);

  await crawlersRepository.create(crawler);
  await AppDataSource.destroy();
}

create().then(() => {
  console.log('Crawler created successfully!');
  process.exit(0);
});
