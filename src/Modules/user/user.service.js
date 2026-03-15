import { User } from "../../DB/Models/user.model.js";
import { File } from "../../DB/Models/file.model.js";
import { OTP } from "../../DB/Models/otp.model.js";
import { generateOTP,hashOTP,sendOtpEmail } from "../../utils/email/index.js";
import { asyncHandler } from "../../utils/index.js";

export const getMe =asyncHandler(async(req, res, next)=>{
  return res.status(200).json({
  success:true,
  data:{
    _id: req.authUser._id,
    username:req.authUser.username,
    email:req.authUser.email,
    role:req.authUser.role,
    isEmailConfirmed:req.authUser.isEmailConfirmed,
    createdAt:req.authUser.createdAt
  },
  });
});


export const updateAccount = asyncHandler(async(req, res, next)=>{
  const {username,email} = req.body;
  const user = await User.findById(req.authUser._id);
  if(!user){
    const error =new Error("User not found");
    error.statusCode =404;
    return next(error);
  }
  if(username) user.username = username;
  if(email && email !== user.email){
    const exists = await User.findOne({email});
    if(exists){
      const error = new Error("Email already in use");
      error.statusCode = 409;
      return next(error);
    }
    user.email= email;
    user.isEmailConfirmed = false;

    const otpCode =generateOTP();
    const hashedCode =hashOTP(otpCode);
    await OTP.create({
      userId:user._id,
      code:hashedCode,
      type:"confirmEmail",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await sendOtpEmail({
      to:email,
      otp:otpCode,
      type:"confirmEmail",
    });
  }
  await user.save();
  return res.status(200).json({
    success:true,
    message:"Account updated successfully",
  });
});

//list users for sharing
export const listUsers = asyncHandler(async(req, res, next)=>{
  const{search}= req.query;
  const filter={_id:{$ne: req.authUser._id}};
  if(search){
    filter.$or =[
      {username: new RegExp(search,"i")},
      {email:new RegExp(search,"i")},
    ];
  }
  const users = await User.find(filter,"username email").limit(50);

  return res.status(200).json({
    success: true,
    data: users,
  });
});

