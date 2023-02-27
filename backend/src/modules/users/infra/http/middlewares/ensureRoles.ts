import { UserRole } from '@modules/users/models/IUser';
import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureRoles(authorizedRoles: UserRole[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const role = request.user.role as UserRole;

    const isRoleAuthorized = authorizedRoles.includes(role);

    if (!isRoleAuthorized) {
      throw new ErrorsApp('Usuário não autorizado a acessar este recurso', 403);
    }
    return next();
  };
}

export { ensureRoles };
