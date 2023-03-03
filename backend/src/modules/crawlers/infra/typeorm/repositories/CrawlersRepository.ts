import { ICreateCrawlerDTO } from '@modules/crawlers/dtos/ICreateCrawlerDTO';
import { ICrawlersRepository } from '@modules/crawlers/repositories/ICrawlersRepository';
import { Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm';

import { Crawler } from '../models/Crawler';

class CrawlersRepository implements ICrawlersRepository {
  private ormRepository: Repository<Crawler>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository<Crawler>(Crawler);
  }

  public async create(data: ICreateCrawlerDTO): Promise<Crawler> {
    const newCrawler = this.ormRepository.create(data);

    await this.ormRepository.save(newCrawler);

    return newCrawler;
  }

  public async getAll(): Promise<Crawler[]> {
    return this.ormRepository.find();
  }

  public async save(data: Crawler): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async incrementReference(linkId: string): Promise<void> {
    await this.ormRepository.increment({ id: linkId }, 'references_number', 1);
  }

  public async findById(id: string): Promise<Crawler | undefined> {
    const crawler = await this.ormRepository.findOne({
      where: { id },
    });

    return crawler;
  }

  public async findByToken(auth_token: string): Promise<Crawler | undefined> {
    const crawler = await this.ormRepository.findOne({
      where: { auth_token },
    });

    return crawler;
  }

  public async delete(crawler: Crawler): Promise<void> {
    await this.ormRepository.remove(crawler);
  }
}

export { CrawlersRepository };
