import joi from "joi";

export const updateProfile =joi
  .object({
    username: joi.string().min(2).max(20),
    email:joi.string().email(),
  })
  .required();
