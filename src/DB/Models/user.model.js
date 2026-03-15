import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
export const roles ={
  USER:"user",
  ADMIN:"admin"
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
    isEmailConfirmed:{
      type:Boolean,
      default:false
    }
  },
  { timestamps:true}
);

userSchema.pre("save",async function (){
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password,10);
});
export const User = model("User", userSchema);
