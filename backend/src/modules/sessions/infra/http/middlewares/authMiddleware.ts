import { authConfig } from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ErrorsApp from '@shared/errors/ErrorsApp';

interface ITokenResponse {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const token = request.cookies.access_token;

  if (!token) {
    throw new ErrorsApp('Acesso não autorizado', 401);
  }

  // throw new ErrorsApp('Realize o login novamente', 401);
  try {
    const check = (await verify(
      token,
      authConfig.jwt.secret,
    )) as ITokenResponse;

    request.user = {
      id: check.sub,
      role: check.role,
    };

    return next();
  } catch (error) {
    throw new ErrorsApp('Token Inválido', 401);
  }
}

export { authMiddleware };
