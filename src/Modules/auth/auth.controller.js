import { Router } from "express";
import * as authService from "./auth.service.js";
import * as authValidation from "./auth.validation.js";
import { asyncHandler } from "../../utils/index.js";
import { isValid } from "../../Middlewares/validation.middleware.js";

const router = Router();

router.post("/register",
  isValid(authValidation.register),
  asyncHandler(authService.register)
);
router.post(
  "/confirm-email", 
  isValid(authValidation.confirmEmail), 
  asyncHandler(authService.confirmEmail));
router.post("/login", 
  isValid(authValidation.login), 
  asyncHandler(authService.login));
router.post(
  "/forget-password", 
  isValid(authValidation.forgetPassword), 
  asyncHandler(authService.forgetPassword));
router.post("/verify-otp",
  isValid(authValidation.verifyOtp),
  asyncHandler(authService.verifyOtp)
);
router.post(
  "/reset-password", 
  isValid(authValidation.resetPassword), 
  asyncHandler(authService.resetPassword));

export default router;
