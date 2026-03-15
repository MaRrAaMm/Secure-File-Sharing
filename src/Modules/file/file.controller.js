import { Router } from "express";
import { isAuthenticated } from "../../Middlewares/auth.middleware.js";
import { isAuthorized } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../DB/Models/user.model.js";
import { uploadFile, fileValidation  as multerFileValidation } from "../../utils/fileUploads/multer.js";
import { isValid } from "../../middlewares/validation.middleware.js";
import * as fileValidation from "./file.validation.js";
import * as fileService from "./file.service.js";
import { asyncHandler } from "../../utils/index.js";

const router = Router();

// upload
router.post("/upload",
  isAuthenticated,
  uploadFile(multerFileValidation.files).single("file"),
  asyncHandler(fileService.uploadFile)
);

// download
router.get(
  "/download/:fileId",
  isAuthenticated,
  isValid(fileValidation.downloadFile),
  asyncHandler(fileService.downloadFile)
);

// share
router.post(
  "/share/:fileId",
  isAuthenticated,
  isValid(fileValidation.shareFile),
  asyncHandler(fileService.shareFile)
);
router.get("/",
  isAuthenticated,
  asyncHandler(fileService.getMyFiles)
);
router.delete(
  "/:fileId",
  isAuthenticated,
  isValid(fileValidation.deleteFile),
  asyncHandler(fileService.deleteFile)
);
export default router;
