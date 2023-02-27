import { CrawlerLinkPeriodicity } from '../models/ICrawlerLink';

interface ICreateCrawlerLinkCategoryDTO {
  category: string;
  slug: string;
  description?: string;
  reference_name?: string;
  periodicity: CrawlerLinkPeriodicity;
  reference_options?: string;
  required_fields: string;
}

export { ICreateCrawlerLinkCategoryDTO };
