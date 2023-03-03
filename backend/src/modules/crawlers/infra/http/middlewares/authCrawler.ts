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

async function authCrawler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const header = request.headers.authorization;

  if (!header) {
    throw new ErrorsApp('Not authorized', 401);
  }

  try {
    const [, token] = header.split(' ');
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
    throw new ErrorsApp('Invalid Token', 401);
  }
}

export { authCrawler };
