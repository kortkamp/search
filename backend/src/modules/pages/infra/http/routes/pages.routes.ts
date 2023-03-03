import { authCrawler } from '@modules/crawlers/infra/http/middlewares/authCrawler';
import { Router } from 'express';

import { PagesController } from '../controllers/PagesController';
import { createPageValidate } from '../validations/pages.validation';

const pagesRoutes = Router();

const pagesController = new PagesController();

pagesRoutes.use(authCrawler);

pagesRoutes.post('/', createPageValidate, pagesController.create);

export { pagesRoutes };
