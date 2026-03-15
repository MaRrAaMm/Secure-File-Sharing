import Joi from "joi";

export const upsertProfile = Joi.object({
  fullName: Joi.string().min(2).max(50),
  profilePicture: Joi.string().uri(),
  preferences: Joi.object({
    emailNotifications: Joi.boolean(),
    twoFactorAuth: Joi.boolean(),
    autoDeleteExpiredFiles: Joi.boolean()
  })
}).required();
