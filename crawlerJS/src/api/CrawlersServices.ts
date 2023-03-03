import { logger } from '@shared/utils/logger';

import api, { setAccessToken } from './api';

interface IGetLinkResponse {
  success: boolean;
  links: {
    url: string;
    id: string;
  }[];
}

const registerCrawler = async () => {
  const authToken = process.env.AUTH_TOKEN;
  const response = await api.post(`/crawlers/register/${authToken}`);

  const { token } = response.data.crawler;
  setAccessToken(token);
  logger.debug(` ${response.data.crawler.name} registered`);
};

const unregisterCrawler = async () => {
  const token = process.env.AUTH_TOKEN;
  await api.post(`/crawlers/unregister/`);
  logger.debug(`crawler unregistered ${token}`);
};

const getLink = async () => {
  // return [{ url: 'https://www.aperibe.rj.gov.br', id: 'asd' }];
  const response = await api.get('/crawlers/links/allocate');
  const { links } = response.data as IGetLinkResponse;
  logger.debug(`got new links: ${links[0]?.url}`);
  return links;
};

const releaseLink = async (id: string) => {
  await api.post(`/crawlers/links/release/${id}`);
  logger.debug(`link released ${id}`);
};

const addLinks = async (links: string[]) => {
  await api.post('/crawlers/links', { urls: links });

  logger.debug(`${links.length} links added`);
};

export { getLink, releaseLink, addLinks, registerCrawler, unregisterCrawler };
