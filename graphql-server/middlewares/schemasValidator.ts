import Joi from 'joi';
import { BalloonColor, BalloonType } from '../types/enums';

export const userSchemaValidator = Joi.object({
  userName: Joi.string().min(1).max(20).required(),
  password: Joi.string()
    .min(8)
    .max(12)
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required(),
});

export const balloonSchemaValidator = Joi.object({
  id: Joi.string().allow('').alphanum().length(24).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(BalloonType))
    .required(),
  color: Joi.string()
    .valid(...Object.values(BalloonColor))
    .required(),
  longitude: Joi.number().required().min(-90).max(90),
  latitude: Joi.number().required().min(-90).max(90),
  altitude: Joi.number().required().min(0),
});
