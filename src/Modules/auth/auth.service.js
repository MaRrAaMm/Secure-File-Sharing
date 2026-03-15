import {User} from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/error/index.js";
import { OTP } from "../../DB/Models/otp.model.js";
import { generateOTP,hashOTP,sendOtpEmail } from "../../utils/email/index.js";

//register
export const register = asyncHandler(async (req, res, next) =>{
  const{username, email, password} = req.body;
  const userExist = await User.findOne({email});
  if(userExist){
    const error =new Error("Email already exists");
    error.statusCode= 409;
    return next(error);
  }
  const user= await User.create({
    username,
    email,
    password,
  });
  const otpCode = generateOTP();
  const hashedCode = hashOTP(otpCode);
  await OTP.create({
    userId:user._id,
    code:hashedCode,
    type:"confirmEmail",
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
  });
  await sendOtpEmail({
    to:user.email,
    otp:otpCode,
    type:"confirmEmail",
  });

  return res.status(201).json({
    success:true,
    message:"OTP SENT",
    userId:user._id,
    email:user.email,
  });
});

export const confirmEmail=asyncHandler( async(req, res, next)=>{
  const{email,otp}= req.body;
  const user=await User.findOne({email});
  if(!user){
  const error=new Error("User not found");
  error.statusCode=404;
  return next(error);
  }
  if(user.isEmailConfirmed){
  const error= new Error("Email already confirmed");
  error.statusCode=409;
  return next(error);
  }
  const otpRecord= await OTP.findOne({
    userId:user._id,
    type:"confirmEmail",
  }).sort({createdAt:-1});
  if(!otpRecord){
  const error= new Error("OTP not found or expired");
  error.statusCode =400;
  return next(error);
  }
  const hashedInput =hashOTP(otp);
  if(hashedInput !== otpRecord.code){
  const error = new Error("Invalid OTP");
  error.statusCode = 400;
  return next(error);
  }
  user.isEmailConfirmed =true;
  await user.save();
  return res.status(200).json({
    success:true,
    message:"Email confirmed successfully",
  });
});

//login
export const login = asyncHandler(async (req, res, next) =>{
  const{email, password} = req.body;
  const user =await User.findOne({email});
  if(!user){
    const error= new Error("Invalid email or password");
    error.statusCode=401;
    return next(error);
  }
  if(!user.isEmailConfirmed){
 return next(new Error("Please confirm your email first"));
  }
  const match =await bcrypt.compare(password,user.password);
  if(!match){
    const error= new Error("Invalid email or password");
    error.statusCode=401;
    return next(error);
  }
  const token = jwt.sign(
    {
      id:user._id,
      email:user.email,
      role:user.role
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  );
  return res.status(200).json({success:true,token});
});

export const forgetPassword =asyncHandler(async(req, res, next)=>{
  const{email}=req.body;
  const user=await User.findOne({email});
  if(!user){
  const error=new Error("Email not found");
  error.statusCode =404;
  return next(error);
  }
  const otpCode = generateOTP();
  const hashedCode = hashOTP(otpCode);
  await OTP.create({
    userId:user._id,
    code:hashedCode,
    type:"resetPassword",
    expiresAt: new Date(Date.now() + 2 * 60 * 1000)
  });
  await sendOtpEmail({
    to:user.email,
    otp:otpCode,
    type:"resetPassword"
  });

  return res.status(200).json({success:true,message:"Reset otp sent"});
});

export const verifyOtp = asyncHandler(async (req, res, next)=>{
  const{email,otp} = req.body;
  const user = await User.findOne({email});
  if(!user){
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  const otpRecord = await OTP.findOne({
    userId: user._id,
    type:"resetPassword",
  }).sort({createdAt:-1});
  if(!otpRecord){
    const error =new Error("OTP not found or expired");
    error.statusCode = 400;
    return next(error);
  }
  const hashedInput = hashOTP(otp);
  if(hashedInput !== otpRecord.code){
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    return next(error);
  }
  await OTP.deleteOne({_id: otpRecord._id});
  const resetToken=jwt.sign(
    {userId: user._id, purpose:"resetPassword"},
    process.env.JWT_SECRET,
    {expiresIn:"2m"}
  );

  return res.status(200).json({
    success:true,
    message:"OTP verified successfully",
    resetToken
  });
});

export const resetPassword = asyncHandler(async (req, res, next)=>{
  const {resetToken, newPassword} = req.body;
  let decoded;
  try {
    decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
  } catch (err){
    const error = new Error("Invalid or expired reset token");
    error.statusCode = 400;
    return next(error);
  }
  if(decoded.purpose !== "resetPassword"){
    const error = new Error("Invalid token purpose");
    error.statusCode =400;
    return next(error);
  }
  const user = await User.findById(decoded.userId);
  if(!user){
    const error = new Error("User not found");
    error.statusCode =404;
    return next(error);
  }
  user.password = newPassword;
  await user.save();
  return res.status(200).json({
    success:true,
    message:"Password reset successful",
  });
});