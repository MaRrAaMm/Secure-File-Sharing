import { Router } from "express";
import { isAuthenticated } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as userService from "./user.service.js";
import * as userValidation from "./user.validation.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();
router.get(
  "/me",
  isAuthenticated,
  asyncHandler(userService.getProfile)
);

router.patch(
  "/me",
  isAuthenticated,
  isValid(userValidation.updateProfile),
  asyncHandler(userService.updateProfile)
);

router.get(
  "/",
  isAuthenticated,
  asyncHandler(userService.listUsers)
);

router.get(
  "/my-files",
  isAuthenticated,
  asyncHandler(userService.getMyFiles)
);

export default router;
