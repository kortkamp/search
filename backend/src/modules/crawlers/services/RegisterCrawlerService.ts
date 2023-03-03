import { authConfig } from '@config/auth';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { logger } from '@shared/utils/logger';

import { ICrawlersRepository } from '../repositories/ICrawlersRepository';

interface IRequest {
  auth_token: string;
}

@injectable()
class RegisterCrawlerService {
  constructor(
    @inject('CrawlersRepository')
    private crawlersRepository: ICrawlersRepository,
  ) {}
  public async execute({ auth_token }: IRequest) {
    const crawler = await this.crawlersRepository.findByToken(auth_token);

    if (!crawler) {
      throw new ErrorsApp('Crawler does not exists');
    }

    const token = sign({ id: crawler.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    crawler.running_instances += 1;

    await this.crawlersRepository.save(crawler);

    logger.info(`Crawler ${crawler.name} registered!`);

    return {
      name: crawler.name,
      token,
    };
  }
}

export { RegisterCrawlerService };
