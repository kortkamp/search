import { authCrawler } from '@modules/crawlers/infra/http/middlewares/authCrawler';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { ensureRoles } from '@modules/users/infra/http/middlewares/ensureRoles';
import { UserRole } from '@modules/users/models/IUser';
import { Router } from 'express';

import { PagesController } from '../controllers/PagesController';
import { createPageValidate } from '../validations/pages.validation';

const pagesRoutes = Router();

const pagesController = new PagesController();

pagesRoutes.use(authCrawler);

pagesRoutes.post('/', createPageValidate, pagesController.create);

export { pagesRoutes };
