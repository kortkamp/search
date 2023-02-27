import { IParseResult, parser } from '@modules/Parser';

import { logger } from '@shared/utils/logger';

import { addLinks, getLink, releaseLink } from './api/LinkServices';
import { fetchPage } from './api/WebServices';

class App {
  private isRunning = false;

  private async run() {
    const newLinks = await getLink();

    let parseResult: IParseResult;

    if (newLinks.length === 0) {
      // TODO should await some delay and make another request

      return 'no links';
    }
    try {
      const pageData = await fetchPage(newLinks[0].url);
      parseResult = parser(pageData);
      await addLinks(parseResult.links);
      // console.log(result);
      const { title, description, h1, h2, content } = parseResult;
      releaseLink(newLinks[0].id, { title, description, h1, h2, content });
    } catch (error) {
      logger.error(error);
      releaseLink(newLinks[0].id);
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
    logger.info('crawler 666 started');
    this.isRunning = true;
    return this.run();
  };
}

export { App };
