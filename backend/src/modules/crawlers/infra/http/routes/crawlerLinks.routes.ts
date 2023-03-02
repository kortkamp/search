import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { ensureRoles } from '@modules/users/infra/http/middlewares/ensureRoles';
import { UserRole } from '@modules/users/models/IUser';
import { Router } from 'express';

import { CrawlerLinksController } from '../controllers/CrawlerLinksController';
import {
  createCrawlerLinkValidate,
  deleteCrawlerLinkValidate,
  listCrawlerLinksValidate,
  releaseCrawlerLinkValidate,
  updateCrawlerLinkValidate,
} from '../validations/crawlerLinks.validation';

const crawlerLinksRoutes = Router();

crawlerLinksRoutes.use(authMiddleware);

const crawlerLinksController = new CrawlerLinksController();

crawlerLinksRoutes.get(
  '/',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN]),
  listCrawlerLinksValidate,
  crawlerLinksController.index,
);

crawlerLinksRoutes.get(
  '/allocate',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CRAWLER]),
  crawlerLinksController.allocate,
);

crawlerLinksRoutes.get(
  '/search',
  // ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CRAWLER]),
  crawlerLinksController.search,
);

crawlerLinksRoutes.patch(
  '/release/:id',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CRAWLER]),
  releaseCrawlerLinkValidate,
  crawlerLinksController.release,
);

crawlerLinksRoutes.delete(
  '/:id',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN]),
  deleteCrawlerLinkValidate,
  crawlerLinksController.delete,
);

crawlerLinksRoutes.put(
  '/:id',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN]),
  updateCrawlerLinkValidate,
  crawlerLinksController.update,
);

crawlerLinksRoutes.post(
  '/',
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN]),
  createCrawlerLinkValidate,
  crawlerLinksController.create,
);

export { crawlerLinksRoutes };
