import {Router} from "express";
import apiRouter from "./api/index.api.js";
import sessionsRouter from "./api/sessions.api.js";
import cookiesRouter from "./api/cookies.api.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/api", cookiesRouter)
indexRouter.use("/api",sessionsRouter);

export default indexRouter;