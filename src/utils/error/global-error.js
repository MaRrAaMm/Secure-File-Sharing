import fs from "fs";
import path from "path";

export const globalError =(error, req, res, next) =>{
  // delete uploaded file only if path exists
  if (req.file?.path) {
    const fullPath = path.resolve(req.file.path);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  return res.status(error.cause || 500).json({
    success:false,
    message:error.message,
    stack:error.stack,
  });
};
