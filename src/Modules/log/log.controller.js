import { Router } from "express";
import { isAuthenticated } from "../../Middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/index.js";
import * as logService from "./log.service.js";

const router = Router();
router.get(
  "/",
  isAuthenticated,
  asyncHandler(logService.getMyLogs)
);

export default router;
