import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { ensureRoles } from '@modules/users/infra/http/middlewares/ensureRoles';
import { ensureRolesOrSelf } from '@modules/users/infra/http/middlewares/ensureRolesOrSelf';
import { UserRole } from '@modules/users/models/IUser';
import { Router } from 'express';

import { paramsIdValidate } from '@shared/infra/http/validations/default.validation';

import { UsersController } from '../controllers/UsersController';
import {
  createUserValidate,
  listUsersValidate,
  setUserActiveValidate,
  updateUserValidate,
} from '../validations/users.validation';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.use(authMiddleware);

usersRoutes.post('/', createUserValidate, usersController.create);

usersRoutes.put(
  '/:id',
  ensureRolesOrSelf([UserRole.SUPER_ADMIN]),
  updateUserValidate,
  usersController.update,
);

usersRoutes.delete(
  '/:id',
  ensureRoles([UserRole.SUPER_ADMIN]),
  paramsIdValidate,
  usersController.delete,
);

usersRoutes.get(
  '/:id',
  ensureRolesOrSelf([UserRole.SUPER_ADMIN]),
  paramsIdValidate,
  usersController.show,
);

usersRoutes.get(
  '/',
  ensureRoles([UserRole.SUPER_ADMIN]),
  listUsersValidate,
  usersController.index,
);

usersRoutes.patch(
  '/active/:id',
  ensureRolesOrSelf([UserRole.SUPER_ADMIN]),
  setUserActiveValidate,
  usersController.setActive,
);

export { usersRoutes };
