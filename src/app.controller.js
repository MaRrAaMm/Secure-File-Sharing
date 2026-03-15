import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import userRouter from "./Modules/user/user.controller.js";
import fileRouter from "./Modules/file/file.controller.js";
import logRouter from "./Modules/log/log.controller.js";
import profileRouter from "./Modules/profile/profile.controller.js";
import { notFound, globalError } from "./utils/error/index.js";

const authLimiter = rateLimit({
  windowMs:15 * 60 * 1000, 
  max:50, 
  message:{
    success:false,
    message:"Too many requests, please try again later",
  },
});
const bootstrap = async(app, express)=>{
  app.use(helmet());
  app.use(cors({origin: process.env.ALLOWED_ORIGIN ||"*"}));
  app.use(express.json());
  await connectDB();

  app.use("/auth", authLimiter, authRouter);
  app.use("/users", userRouter);
  app.use("/files", fileRouter);
  app.use("/logs", logRouter);
  app.use("/profile", profileRouter);

  app.use(notFound);
  app.use(globalError);
};

export default bootstrap;