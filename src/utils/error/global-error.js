import fs from "fs";
import path from "path";

export const globalError = (error, req, res, next)=>{
  if(req.file?.path){
    const fullPath = path.resolve(req.file.path);
    if(fs.existsSync(fullPath)){
      fs.unlinkSync(fullPath);
    }
  }

  return res.status(error.statusCode || 500).json({
    success:false,
    message:error.message,
    stack:process.env.NODE_ENV ==="development" ?error.stack:undefined,
  });
};