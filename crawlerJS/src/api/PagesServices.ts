import { logger } from '@shared/utils/logger';

import api from './api';

interface IAddPageParams {
  url: string;

  title: string;

  description: string;

  h1: string;

  content: string;
}

const addPage = async (params?: IAddPageParams) => {
  await api.post(`/pages`, { ...params });
  logger.debug(`Added page`);
};

export { addPage };
