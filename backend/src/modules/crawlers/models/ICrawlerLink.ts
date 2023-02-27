interface ICrawlerLink {
  id: string;

  url: string;

  is_crawling: boolean;

  references_number: number;

  title: string;

  description: string;

  h1: string;

  h2: string;

  content: string;

  crawled_at: Date;

  created_at: Date;

  updated_at: Date;
}

export { ICrawlerLink };
