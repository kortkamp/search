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
  const response = await api.get('/crawler-links/allocate');
  const { links } = response.data as IGetLinkResponse;
  logger.debug(`got new links: ${links[0]?.url}`);
  return links;
};

interface IReleaseLinkParams {
  title: string;

  description: string;

  h1: string;

  h2: string;

  content: string;
}

const releaseLink = async (id: string, params?: IReleaseLinkParams) => {
  await api.patch(`/crawler-links/release/${id}`, { ...params });
  logger.debug(`link released ${id}`);
};

const addLinks = async (links: string[]) => {
  await api.post('/crawler-links', { urls: links });

  logger.debug(`${links.length} links added`);
};

export { getLink, releaseLink, addLinks };
