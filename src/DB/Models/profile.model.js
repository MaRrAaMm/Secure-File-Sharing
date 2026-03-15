import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },
  fullName:{
    type:String,
    required:true
  },
  profilePicture:{
  type:String,
  default:"https://ui-avatars.com/api/?name=User&background=ff4d4f&color=fff"

  },
  preferences:{
    emailNotifications:{
      type:Boolean,
      default:true
    },
    twoFactorAuth:{
      type:Boolean,
      default:false
    },
    autoDeleteExpiredFiles:{
      type:Boolean,
      default:false
    }
  }
},
{timestamps:true}
);

export const UserProfile = model("UserProfile",profileSchema);