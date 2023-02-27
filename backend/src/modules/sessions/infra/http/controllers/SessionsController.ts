import { authConfig } from '@config/auth';
import { CreateSessionService } from '@modules/sessions/services/CreateSessionService';
import { RefreshSessionService } from '@modules/sessions/services/RefreshSessionService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSession = container.resolve(CreateSessionService);

    const session = await createSession.execute(request.body);

    return response
      .cookie('access_token', session.token, {
        httpOnly: true,
        maxAge: authConfig.tokenMaxAge,
        secure: process.env.ENVIRONMENT === 'production',
      })
      .status(200)
      .json(instanceToInstance(session));
  }

  public async refresh(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const refreshSessionService = container.resolve(RefreshSessionService);

    const session = await refreshSessionService.execute({
      userId: request.user.id,
    });

    return response
      .cookie('access_token', session.token, {
        httpOnly: true,
        maxAge: authConfig.tokenMaxAge,
        secure: process.env.ENVIRONMENT === 'production',
      })
      .status(200)
      .json({ success: true });
  }

  public async logout(_: Request, response: Response): Promise<Response> {
    return response
      .clearCookie('access_token')
      .status(200)
      .json({ success: true, message: 'Logout efetuado com sucesso' });
  }
}

export { SessionsController };
