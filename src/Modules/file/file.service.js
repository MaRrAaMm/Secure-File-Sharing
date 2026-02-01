import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { File } from "../../DB/Models/file.model.js";
import { Log, logActions } from "../../DB/Models/log.model.js";
import { encryptFile, decryptFile } from "../../utils/crypto/index.js";
import { User } from "../../DB/Models/user.model.js";


export const uploadFile = async(req, res, next) =>{
  const uploadedFile = req.file;
  if (!uploadedFile){
    return next(new Error("file is required",{cause: 400}));
  }
  const{ encryptedData, iv} = encryptFile(uploadedFile.buffer);
  const userFolder = path.resolve("uploads", req.authUser._id.toString());
  fs.mkdirSync(userFolder,{recursive: true});
  const fileName = nanoid();
  const encryptedPath = path.join(userFolder, fileName);
  fs.writeFileSync(encryptedPath, encryptedData);
  //save in db
  const savedFile = await File.create({
    owner: req.authUser._id,
    originalName: uploadedFile.originalname,
    encryptedPath,
    iv,
    mimeType: uploadedFile.mimetype,
    size: uploadedFile.size,
  });

  await Log.create({
    user: req.authUser._id,
    file: savedFile._id,
    action: logActions.UPLOAD,
  });
  return res.status(201).json({
    success: true,
    data: savedFile,
  });
};


export const downloadFile = async(req, res, next) =>{
  const{ fileId} = req.params;
  //get file in db
  const file =await File.findById(fileId);
  if (!file)return next(new Error("file not found",{cause: 404}));
  //authorization owner shared with download
  const isOwner = file.owner.toString()=== req.authUser._id.toString();
  const isSharedWithDownload = file.sharedWith?.some(
    (item)=>
      item.user.toString()=== req.authUser._id.toString()&&
      item.permission ==="download"
  );
  if (!isOwner&& !isSharedWithDownload){
    return next(new Error("not allowed to download this file",{ cause: 403}));
  }
  //read encrypted file,check in server
  if (!fs.existsSync(file.encryptedPath)){
    return next(new Error("file missing on server",{cause: 500}));
  }
  //read encrypt file
  const encryptedBuffer = fs.readFileSync(file.encryptedPath);
  //decrypt
  const decryptedBuffer = decryptFile(encryptedBuffer, file.iv);
  await Log.create({
    user: req.authUser._id,
    file: file._id,
    action: logActions.DOWNLOAD,
  });
  //response
  res.setHeader("Content-Type",file.mimeType);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${file.originalName}"`
  );

  return res.status(200).send(decryptedBuffer);
};


export const shareFile = async(req, res, next) =>{
  const{ fileId} = req.params;
  const{ targetUserId, permission} = req.body;
  //get file
  const file = await File.findById(fileId);
  if (!file) return next(new Error("file not found",{ cause:404}));

  //only owner can share
  if (file.owner.toString() !==req.authUser._id.toString()){
    return next(new Error("only owner can share this file",{ cause:403}));
  }
  //check target user
  const targetUser = await User.findById(targetUserId);
  if (!targetUser)
    return next(new Error("target user not found",{cause: 404}));

  //prevent duplicate share
  const alreadyShared = file.sharedWith.some(
    (item)=> item.user.toString() ===targetUserId.toString()
  );
  if (alreadyShared){
    return next(new Error("file already shared with this user",{ cause:400}));
  }

  //share
  file.sharedWith.push({
    user:targetUserId,
    permission,
  });
  await file.save();

  //log
  await Log.create({
    user: req.authUser._id,
    file:file._id,
    action:logActions.SHARE,
  });

  return res.status(200).json({
    success:true,
    message: "file shared successfully",
    data: file,
  });
};
