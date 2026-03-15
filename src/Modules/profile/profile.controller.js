import { Router } from "express";
import { isAuthenticated } from "../../Middlewares/auth.middleware.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as profileService from "./profile.service.js";
import * as profileValidation from "./profile.validation.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();

router.post("/upsert",
 isAuthenticated,
 isValid(profileValidation.upsertProfile),
 asyncHandler(profileService.upsertProfile)
);

router.get("/me",
 isAuthenticated,
 asyncHandler(profileService.getMyProfile)
);
router.delete("/delete",
 isAuthenticated,
 asyncHandler(profileService.deleteAccount)
);

export default router;