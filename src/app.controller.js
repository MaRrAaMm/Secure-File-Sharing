import cors from "cors";
import connectDB from "./DB/connection.js";
import authRouter from "./Modules/auth/auth.controller.js";
import userRouter from "./Modules/user/user.controller.js";
import fileRouter from "./Modules/file/file.controller.js";
import logRouter from "./Modules/log/log.controller.js";
import { notFound, globalError } from "./utils/error/index.js";
const bootstrap = async (app, express) =>{
  app.use(cors());
  app.use(express.json());
  await connectDB();

  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/files", fileRouter);
  app.use("/logs", logRouter);
  //error handling
  app.use(notFound);
  app.use(globalError);
};

export default bootstrap;