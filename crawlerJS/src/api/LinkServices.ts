import { logger } from '@shared/utils/logger';

import api from './api';

interface IGetLinkResponse {
  success: boolean;
  links: {
    url: string;
    id: string;
  }[];
}

const getLink = async () => {
  // return [{ url: 'https://www.aperibe.rj.gov.br', id: 'asd' }];
  const response = await api.get('/crawler-links/allocate');
  const { links } = response.data as IGetLinkResponse;
  logger.debug(`got new links: ${links[0]?.url}`);
  return links;
};

const releaseLink = async (id: string) => {
  await api.patch(`/crawler-links/release/${id}`);
  logger.debug(`link released ${id}`);
};

const addLinks = async (links: string[]) => {
  await api.post('/crawler-links', { urls: links });

  logger.debug(`${links.length} links added`);
};

export { getLink, releaseLink, addLinks };
