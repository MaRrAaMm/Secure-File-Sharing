import { Schema, model, Types } from "mongoose";
export const filePermissions ={
  READ:"read",
  DOWNLOAD:"download",
};
const sharedWithSchema = new Schema(
  {
    user:{
      type: Types.ObjectId,
      ref:"User",
      required:true,
    },
    permission:{
      type:String,
      enum:Object.values(filePermissions),
      required: true,
    },
  },
  { _id:false}
);

const fileSchema= new Schema(
  {
    owner:{
      type: Types.ObjectId,
      ref:"User",
      required:true,
    },
    originalName:{
      type:String,
      required: true,
    },
    encryptedPath:{
      type:String,
      required: true,
    },
    iv:{
      type:String,
      required:true,
    },
    mimeType:{
      type: String,
      required: true,
    },
    size:{
      type:Number,
      required:true,
    },
    sharedWith:[sharedWithSchema],
  },
  { timestamps: true}
);

export const File = model("File",fileSchema);
