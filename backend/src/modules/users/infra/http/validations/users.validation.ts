import { UserRole } from '@modules/users/models/IUser';
import { celebrate, Joi, Segments } from 'celebrate';

export const createUserValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().required(),
      role: Joi.string()
        .required()
        .valid(...Object.values(UserRole)),
      password: Joi.string().empty('').default(null),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .empty('')
        .default(null),
      tenant_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const confirmUserValidate = celebrate({
  [Segments.QUERY]: {
    token: Joi.string().uuid().required(),
  },
});

export const forgotPasswordValidate = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().trim().required(),
  },
});

export const resetPasswordValidate = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export const updateUserValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email().trim().lowercase(),
    role_id: Joi.string().uuid(),
    active: Joi.boolean(),
    old_password: Joi.string(),
    password: Joi.string(),
  }).and('password', 'old_password'),
});

export const setUserActiveValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    active: Joi.boolean().required(),
  },
});

export const listUsersValidate = celebrate({
  [Segments.QUERY]: {
    tenant_id: Joi.string().uuid(),
    page: Joi.number(),
    per_page: Joi.number(),
  },
});
