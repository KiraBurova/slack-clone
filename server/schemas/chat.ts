import Joi from './joi';

export const startChat = Joi.object().keys({
  title: Joi.string().min(6).max(30).required().label('Title'),
  currentUserId: Joi.string().objectId().label('Current User ID'),
  secondUserId: Joi.string().objectId().label('Second User ID'),
});
