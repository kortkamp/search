import { celebrate, Joi, Segments } from 'celebrate';

export const createCrawlerLinkValidate = celebrate(
  {
    [Segments.BODY]: {
      urls: Joi.array().items(Joi.string().max(2000)).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const updateCrawlerLinkValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      is_crawling: Joi.boolean(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteCrawlerLinkValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const searchCrawlerLinkValidate = celebrate({
  [Segments.QUERY]: {
    search: Joi.string().required(),
    number: Joi.number().integer().positive(),
    per_page: Joi.number().integer().positive(),
  },
});

export const releaseCrawlerLinkValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    title: Joi.string().empty('').default(null),
    description: Joi.string().empty('').default(null),
    h1: Joi.string().empty('').default(null),
    h2: Joi.string().empty('').default(null),
    content: Joi.string().empty('').default(null),
  },
});

export const listCrawlerLinksValidate = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().positive(),
    per_page: Joi.number().positive(),
    is_crawling: Joi.boolean(),
  },
});
