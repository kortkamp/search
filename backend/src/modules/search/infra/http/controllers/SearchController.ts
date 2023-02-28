import { SearchLinksService } from '@modules/search/services/SearchLinksService';
import { Request, Response } from 'express';
import path from 'path';
import { container } from 'tsyringe';

class SearchController {
  public async search(request: Request, response: Response): Promise<void> {
    const searchLinksService = container.resolve(SearchLinksService);

    const { q, page } = request.query;

    const search = (q as string).trim().replace(/\s\s+/g, ' ');

    const crawlerLinks = await searchLinksService.execute({
      search,
      page: Number(page || 1),
      per_page: 10,
    });
    return response.render('result', {
      search,
      links: crawlerLinks.result,
      total_pages: Array.from({ length: crawlerLinks.total_pages }, (_, i) => ({
        page: i + 1,
        is_current: i + 1 === crawlerLinks.page,
      })),
      page: crawlerLinks.page,
      layout: false,
    });
  }

  public async index(request: Request, response: Response): Promise<void> {
    const file = path.join(__dirname, '..', '..', '..', 'views', 'index.html');
    return response.sendFile(file);
  }
}

export { SearchController };
