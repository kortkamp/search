import { IListCrawlerLinksDTO } from '@modules/crawlers/dtos/IListCrawlerLinksDTO';
import { AllocateCrawlerLinkService } from '@modules/crawlers/services/AllocateCrawlerLinkService';
import { CreateCrawlerLinkService } from '@modules/crawlers/services/CreateCrawlerLinkService';
import { DeleteCrawlerLinkService } from '@modules/crawlers/services/DeleteCrawlerLinkService';
import { ListCrawlerLinksService } from '@modules/crawlers/services/ListCrawlerLinksService';
import { ReleaseCrawlerLinkService } from '@modules/crawlers/services/ReleaseCrawlerLinkService';
import { SearchLinksService } from '@modules/crawlers/services/SearchLinksService';
import { UpdateCrawlerLinkService } from '@modules/crawlers/services/UpdateCrawlerLinkService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CrawlerLinksController {
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
  public async search(request: Request, response: Response): Promise<Response> {
    const searchLinksService = container.resolve(SearchLinksService);

    const { search, page, per_page } = request.query;

    const crawlerLinks = await searchLinksService.execute({
      search: search as string,
      page,
      per_page,
    });

    return response.json({
      success: true,
      crawlerLinks: instanceToInstance(crawlerLinks),
    });
  }
  public async allocate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const allocateCrawlerLinkService = container.resolve(
      AllocateCrawlerLinkService,
    );

    const crawlerLinks = await allocateCrawlerLinkService.execute();

    return response.json({
      success: true,
      links: crawlerLinks,
    });
  }

  public async release(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const releaseCrawlerLinkService = container.resolve(
      ReleaseCrawlerLinkService,
    );

    const linkId = request.params.id;

    await releaseCrawlerLinkService.execute({ linkId });

    return response.status(200).json({ success: true });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCrawlerLinkService = container.resolve(
      DeleteCrawlerLinkService,
    );

    const crawlerLinkId = request.params.id;

    await deleteCrawlerLinkService.execute({ crawlerLinkId });

    return response.status(200).json({ success: true });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCrawlerLinkService = container.resolve(
      UpdateCrawlerLinkService,
    );

    const crawlerLinkId = request.params.id;

    const user = await updateCrawlerLinkService.execute({
      crawlerLinkId,
      data: request.body,
    });
    return response.json({ success: true, user });
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

export { CrawlerLinksController };
