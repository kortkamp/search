import { ensureRoles } from '@modules/users/infra/http/middlewares/ensureRoles';
import { UserRole } from '@modules/users/models/IUser';
import { Router } from 'express';

import { SessionsController } from '../controllers/SessionsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createSessionValidate } from '../validations/sessions.validation';

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/', createSessionValidate, sessionsController.create);
sessionsRoutes.get(
  '/',
  authMiddleware,
  ensureRoles([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.PUBLISHER]),
  sessionsController.refresh,
);
sessionsRoutes.delete('/', sessionsController.logout);

export { sessionsRoutes };
