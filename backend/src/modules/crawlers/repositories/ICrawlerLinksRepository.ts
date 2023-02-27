import { IAllocateCrawlerLinksDTO } from '../dtos/IAllocateCrawlerLinksDTO';
import { ICreateCrawlerLinkDTO } from '../dtos/ICreateCrawlerLinkDTO';
import { IListCrawlerLinksDTO } from '../dtos/IListCrawlerLinksDTO';
import { ISearchLinkDTO } from '../dtos/ISearchLinkDTO';
import { ICrawlerLink } from '../models/ICrawlerLink';

interface ICrawlerLinksRepository {
  create(
    data: ICreateCrawlerLinkDTO | ICreateCrawlerLinkDTO[],
  ): Promise<ICrawlerLink>;
  getAll(params: IListCrawlerLinksDTO): Promise<[ICrawlerLink[], number]>;
  allocate(params: IAllocateCrawlerLinksDTO): Promise<[ICrawlerLink[], number]>;
  findById(linkId: string): Promise<ICrawlerLink | undefined>;
  findByUrl(url: string): Promise<ICrawlerLink | undefined>;
  findManyByUrl(urls: string[]): Promise<ICrawlerLink[]>;
  save(dataUpdate: ICrawlerLink | ICrawlerLink[]): Promise<void>;
  delete(user: ICrawlerLink): Promise<void>;
  incrementReference(linkId: string): Promise<void>;
  search(params: ISearchLinkDTO): Promise<[ICrawlerLink[], number]>;
}

export { ICrawlerLinksRepository };
