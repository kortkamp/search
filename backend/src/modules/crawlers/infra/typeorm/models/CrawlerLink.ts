import { ICrawlerLink } from '@modules/crawlers/models/ICrawlerLink';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('crawler_links')
class CrawlerLink implements ICrawlerLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  h1: string;

  @Column()
  h2: string;

  @Column()
  content: string;

  @Column()
  crawled_at: Date;

  @Column()
  is_crawling: boolean;

  @Column()
  references_number: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CrawlerLink };
