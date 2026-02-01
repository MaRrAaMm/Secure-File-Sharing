import Joi from "joi";

export const register = joi.object({
  username: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).required();

export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
}).required();
