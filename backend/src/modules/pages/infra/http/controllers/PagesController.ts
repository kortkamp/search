import { CreatePageService } from '@modules/pages/services/CreatePageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createPageService = container.resolve(CreatePageService);

    const page = await createPageService.execute({
      data: request.body,
    });
    return response.json({ success: true, page });
  }
}

export { PagesController };
