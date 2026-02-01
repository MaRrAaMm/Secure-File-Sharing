import jwt from "jsonwebtoken";
import {User} from "../DB/Models/user.model.js";

export const isAuthenticated = async(req, res, next)=>{
  const {authorization}= req.headers;
  if(!authorization || !authorization.startsWith("Bearer ")){
    const error = new Error("Authentication token is required");
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error= new Error("Invalid or expired token");
    error.statusCode= 401;
    return next(error);
  }
  //user in db
  const user =await User.findById(decoded.id);
  if (!user){
    const error = new Error("User not found");
    error.statusCode = 401;
    return next(error);
  }
  req.authUser =user;
  next();
};
