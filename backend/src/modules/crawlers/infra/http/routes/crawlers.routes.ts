import { Router } from 'express';

import { CrawlerLinksController } from '../controllers/CrawlerLinksController';
import { CrawlersController } from '../controllers/CrawlersController';
import { authCrawler } from '../middlewares/authCrawler';
import {
  createCrawlerLinkValidate,
  releaseCrawlerLinkValidate,
} from '../validations/crawlerLinks.validation';
import { crawlerRegistrationValidate } from '../validations/crawlers.validation';

const crawlersRoutes = Router();

const crawlersController = new CrawlersController();

const crawlerLinksController = new CrawlerLinksController();

crawlersRoutes.post(
  '/register/:auth_token',
  crawlerRegistrationValidate,
  crawlersController.register,
);

crawlersRoutes.use(authCrawler);

crawlersRoutes.post('/unregister', crawlersController.unregister);

crawlersRoutes.get('/links/allocate', crawlerLinksController.allocate);

crawlersRoutes.post(
  '/links/release/:id',
  releaseCrawlerLinkValidate,
  crawlerLinksController.release,
);

crawlersRoutes.post(
  '/links',
  createCrawlerLinkValidate,
  crawlerLinksController.create,
);

export { crawlersRoutes };
