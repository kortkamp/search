import { IListCrawlerLinksDTO } from '@modules/crawlers/dtos/IListCrawlerLinksDTO';
import { CreateCrawlerLinkService } from '@modules/crawlers/services/CreateCrawlerLinkService';
import { ListCrawlerLinksService } from '@modules/crawlers/services/ListCrawlerLinksService';
import { RegisterCrawlerService } from '@modules/crawlers/services/RegisterCrawlerService';
import { UnregisterCrawlerService } from '@modules/crawlers/services/UnregisterCrawlerService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CrawlersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCrawlerLinksService = container.resolve(ListCrawlerLinksService);

    const crawlerLinks = await listCrawlerLinksService.execute({
      query: request.query as any as IListCrawlerLinksDTO,
    });

    return response.json({
      success: true,
      crawlerLinks: instanceToInstance(crawlerLinks),
    });
  }

  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const registerCrawlerService = container.resolve(RegisterCrawlerService);
    const crawler = await registerCrawlerService.execute({
      auth_token: request.params.auth_token,
    });
    return response.json({ success: true, crawler });
  }

  public async unregister(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const unregisterCrawlerService = container.resolve(
      UnregisterCrawlerService,
    );
    const crawler = await unregisterCrawlerService.execute({
      crawlerId: request.user.id,
    });
    return response.json({ success: true, crawler });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createCrawlerLinkService = container.resolve(
      CreateCrawlerLinkService,
    );
    const link = await createCrawlerLinkService.execute({
      urls: request.body.urls,
    });
    return response.json({ success: true, link });
  }
}

export { CrawlersController };
