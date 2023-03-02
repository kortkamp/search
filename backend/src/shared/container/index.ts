import '@shared/container/providers';

import { CrawlerLinksRepository } from '@modules/crawlers/infra/typeorm/repositories/CrawlerLinksRepository';
import { ICrawlerLinksRepository } from '@modules/crawlers/repositories/ICrawlerLinksRepository';
import { PagesRepository } from '@modules/pages/infra/typeorm/repositories/PagesRepository';
import { IPagesRepository } from '@modules/pages/repositories/IPagesRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICrawlerLinksRepository>(
  'CrawlerLinksRepository',
  CrawlerLinksRepository,
);

container.registerSingleton<IPagesRepository>(
  'PagesRepository',
  PagesRepository,
);
