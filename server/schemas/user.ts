import * as Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
  password: Joi.string().min(4).max(30).required().label('Password'),
});
