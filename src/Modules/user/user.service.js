import { User } from "../../DB/Models/user.model.js";
import { File } from "../../DB/Models/file.model.js";

// get my profile
export const getProfile = async (req, res, next) =>{
  return res.status(200).json({
    success: true,
    data: req.authUser,
  });
};

export const updateProfile = async (req, res, next) =>{
  const{ username, email } = req.body;
  const user = await User.findById(req.authUser._id);
  if (!user) return next(new Error("user not found",{ cause: 404}));
  if (username) user.username = username;
  if (email) user.email = email;
  await user.save();
  return res.status(200).json({
    success: true,
    message:"profile updated successfully",
  });
};

//list users for sharing
export const listUsers = async (req, res, next) =>{
  const users = await User.find(
   { _id:{ $ne: req.authUser._id} },
    "username email"
  );
  return res.status(200).json({
    success: true,
    data: users,
  });
};

//get my uploaded files
export const getMyFiles = async(req, res, next) =>{
  const files = await File.find({ owner: req.authUser._id});

  return res.status(200).json({
    success: true,
    data:files,
  });
};
