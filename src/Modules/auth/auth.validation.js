import joi from "joi";

export const register = joi.object({
  username: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
}).required();

export const confirmEmail = joi.object({
  email: joi.string().email().required(),

  otp: joi.string().length(5).required(),
}).required();
export const login = joi
       .object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        })
        .required();

export const forgetPassword = joi.object({
  email: joi.string().email().required(),
}).required();

export const verifyOtp = joi.object({
 email: joi.string().email().required(),
 otp: joi.string().length(5).required()
}).required();

export const resetPassword = joi.object({
  resetToken: joi.string().required(),
  newPassword: joi.string().min(6).required(),
}).required();
