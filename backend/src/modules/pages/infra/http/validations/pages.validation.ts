import { celebrate, Joi, Segments } from 'celebrate';

export const createPageValidate = celebrate(
  {
    [Segments.BODY]: {
      url: Joi.string().max(2000).required(),
      title: Joi.string().max(2000).required(),
      description: Joi.string().max(5000).allow(''),
      h1: Joi.string().max(5000).allow(''),
      content: Joi.string().max(50000).allow(''),
    },
  },
  {
    abortEarly: false,
  },
);
