import { Schema, model, Types } from "mongoose";

export const logActions ={
  UPLOAD:"upload",
  DOWNLOAD:"download",
  SHARE:"share",
  DELETE:"delete",
};

const logSchema = new Schema(
  {
    user:{
      type:Types.ObjectId,
      ref:"User",
      required:true,
    },
    file:{
      type:Types.ObjectId,
      ref:"File",
      required:true,
    },
    action:{
      type:String,
      enum:Object.values(logActions),
      required:true,
    },
  },
  {
    timestamps:true,
  }
);
export const Log = model("Log", logSchema);
