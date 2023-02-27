import { ICreateCrawlerLinkDTO } from '@modules/crawlerLinks/dtos/ICreateCrawlerLinkDTO';
import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import { ICrawlerLink } from '../ICrawlerLink';

class FakeCrawlerLink implements ICrawlerLink {
  id: string;

  name: string;

  segment_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(data?: ICreateCrawlerLinkDTO) {
    this.id = uuid();

    const randomId = crypto.randomBytes(10).toString('hex');
    this.name = `crawlerLink-${randomId}`;

    Object.assign(this, data);

    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export { FakeCrawlerLink };
