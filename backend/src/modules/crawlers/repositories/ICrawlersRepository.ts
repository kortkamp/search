import { ICreateCrawlerDTO } from '../dtos/ICreateCrawlerDTO';
import { ICrawler } from '../models/ICrawler';

interface ICrawlersRepository {
  create(data: ICreateCrawlerDTO): Promise<ICrawler>;
  getAll(): Promise<ICrawler[]>;
  findById(linkId: string): Promise<ICrawler | undefined>;
  findByToken(auth_token: string): Promise<ICrawler | undefined>;
  save(dataUpdate: ICrawler | ICrawler[]): Promise<void>;
  delete(crawler: ICrawler): Promise<void>;
}

export { ICrawlersRepository };
