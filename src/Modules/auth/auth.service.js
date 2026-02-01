import {User} from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/error/index.js";

//register
export const register = asyncHandler(async (req, res, next) =>{
  const{username, email, password} = req.body;
  const userExist = await User.findOne({ email});
  if (userExist){
    const error =new Error("Email already exists");
    error.statusCode= 409;
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user= await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    success:true,
    message:"User registered successfully",
  });
});

//login
export const login = asyncHandler(async (req, res, next) =>{
  const{ email, password} = req.body;
  const user =await User.findOne({email});
  if (!user){
    const error= new Error("Invalid email or password");
    error.statusCode= 401;
    return next(error);
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match){
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  const token = jwt.sign(
    {
      id: user._id,
      email:user.email,
      role:user.role,
    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  );
  return res.status(200).json({
    success: true,
    token,
  });
});
