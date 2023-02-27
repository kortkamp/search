import { ICreateCrawlerLinkDTO } from '@modules/crawlerLinks/dtos/ICreateCrawlerLinkDTO';
import { FakeCrawlerLink } from '@modules/crawlerLinks/models/fakes/FakeCrawlerLink';
import { ICrawlerLink } from '@modules/crawlerLinks/models/ICrawlerLink';
import { ICrawlerLinksRepository } from '@modules/crawlerLinks/repositories/ICrawlerLinksRepository';

class FakeCrawlerLinksRepository implements ICrawlerLinksRepository {
  private crawlerLinks: ICrawlerLink[] = [];

  public async findById(user_id: string): Promise<ICrawlerLink | undefined> {
    const findUser = this.crawlerLinks.find(user => user.id === user_id);

    return findUser;
  }

  public async findByName(email: string): Promise<ICrawlerLink | undefined> {
    const crawlerLink = this.crawlerLinks.find(user => user.name === email);

    return crawlerLink;
  }

  public async create(data: ICreateCrawlerLinkDTO): Promise<ICrawlerLink> {
    const crawlerLink = new FakeCrawlerLink(data);
    this.crawlerLinks.push(crawlerLink);
    return crawlerLink;
  }

  public async update(crawlerLink: ICrawlerLink): Promise<ICrawlerLink> {
    this.crawlerLinks = this.crawlerLinks.map(oldCrawlerLink =>
      oldCrawlerLink.id !== crawlerLink.id ? oldCrawlerLink : crawlerLink,
    );

    return crawlerLink;
  }

  public async getAll(): Promise<ICrawlerLink[]> {
    return this.crawlerLinks;
  }

  public async getTotal(): Promise<number> {
    return this.crawlerLinks.length;
  }

  public async save(data: ICrawlerLink): Promise<void> {
    const searchUser = this.crawlerLinks.findIndex(user => user.id === data.id);

    if (searchUser >= 0) {
      Object.assign(this.crawlerLinks[searchUser], data);
    }
  }

  public async delete(user: ICrawlerLink): Promise<void> {
    const listWithRemovedUsers = this.crawlerLinks.filter(item => item.id !== user.id);
    this.crawlerLinks = listWithRemovedUsers;
  }
}

export default FakeCrawlerLinksRepository;
