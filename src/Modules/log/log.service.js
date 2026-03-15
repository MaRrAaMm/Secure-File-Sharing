import { Log } from "../../DB/Models/log.model.js";

export const getMyLogs = async(req, res, next)=>{
  const logs = await Log.find({user: req.authUser._id})
 .select("action file createdAt")
 .populate("file","originalName")
 .sort({createdAt:-1})
 .limit(50);

  return res.status(200).json({
    success:true,
    data:logs,
  });
};
