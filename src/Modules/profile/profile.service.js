import fs from "fs";
import { asyncHandler } from "../../utils/index.js";
import { User } from "../../DB/Models/user.model.js";
import { UserProfile } from "../../DB/Models/profile.model.js";
import { File } from "../../DB/Models/file.model.js";
import { Log } from "../../DB/Models/log.model.js";
import { OTP } from "../../DB/Models/otp.model.js";

//create+update
export const upsertProfile = asyncHandler(async(req, res, next)=>{
  const userId = req.authUser._id;
  const{fullName,profilePicture,preferences} = req.body;
  const profile = await UserProfile.findOneAndUpdate({userId},
    {$set:{fullName, profilePicture, preferences}},
    {new:true, upsert: true, runValidators:true}
    ).select("-__v");

  return res.status(200).json({
    success:true,
    data:profile,
  });
});


export const getMyProfile = asyncHandler(async (req, res, next) =>{
 const profile = await UserProfile.findOne({
    userId: req.authUser._id
    }).select("-__v");
 if(!profile){
  return next(new Error("profile not found",{cause:404}));
 }

 return res.status(200).json({
  success:true,
  data:profile
 });
});

export const deleteAccount = asyncHandler(async(req, res, next)=>{
  const userId = req.authUser._id;
  //delete files in disk
  const files = await File.find({owner:userId});
  for(const file of files){
    if(fs.existsSync(file.encryptedPath)){
      fs.unlinkSync(file.encryptedPath);
    }
  }
  await File.deleteMany({owner:userId});
  await Log.deleteMany({user:userId});
  await OTP.deleteMany({userId});
  await UserProfile.findOneAndDelete({userId});
  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success:true,
    message: "Account deleted successfully"
  });
});