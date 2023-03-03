import { validateLink } from '@modules/LinkValidation';
import { IParseResult, parser } from '@modules/Parser';
import {
  registerCrawler,
  unregisterCrawler,
  addLinks,
  getLink,
  releaseLink,
} from 'api/CrawlersServices';
import { addPage } from 'api/PagesServices';

import { logger } from '@shared/utils/logger';

import { fetchPage } from './api/WebServices';

class App {
  private isRunning = false;

  private async run() {
    const newLinks = await getLink();

    const link = newLinks[0];

    const isValid = await validateLink(link.url);

    if (!isValid) {
      return;
    }

    if (newLinks.length === 0) {
      // TODO should await some delay and make another request

      return;
    }
    try {
      const pageData = await fetchPage(link.url);
      const parseResult = parser(pageData);
      const { title, description, h1, content } = parseResult;
      await addLinks(parseResult.links);
      await addPage({ url: link.url, title, description, h1, content });
      await releaseLink(link.id);
    } catch (error) {
      logger.error(error);
      releaseLink(link.id);
    }
    if (this.isRunning) {
      // return;
      await this.run();
    }
  }

  public close = () => {
    this.isRunning = false;
  };

  public start = async () => {
    await registerCrawler();
    this.isRunning = true;
    await this.run();
    await unregisterCrawler();
  };
}

export { App };
