import { celebrate, Joi, Segments } from 'celebrate';

export const crawlerRegistrationValidate = celebrate({
  [Segments.PARAMS]: {
    auth_token: Joi.string().required(),
  },
});
