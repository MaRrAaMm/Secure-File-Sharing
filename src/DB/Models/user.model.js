import { Schema, model } from "mongoose";

export const roles ={
  USER:"user",
  ADMIN:"admin",
};
const userSchema = new Schema(
  {
    username:{
      type:String,
      required:true,
      minlength:2,
      maxlength:20,
    },
    email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
    },
    password:{
      type:String,
      required:true,
    },
    role:{
      type:String,
      enum:Object.values(roles),
      default: roles.USER,
    },
  },
  { timestamps:true}
);
export const User = model("User", userSchema);
