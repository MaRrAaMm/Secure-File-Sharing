import { Router } from "express";
import { isAuthenticated } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as userService from "./user.service.js";
import * as userValidation from "./user.validation.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();
router.get("/me",
  isAuthenticated,
  asyncHandler(userService.getMe)
);

router.patch("/me",
  isAuthenticated,
  isValid(userValidation.updateAccount),
  asyncHandler(userService.updateAccount)
);

router.get( "/",
  isAuthenticated,
  asyncHandler(userService.listUsers)
);

export default router;
