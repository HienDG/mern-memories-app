import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import httpStatus from "http-status";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import postRoute from "./routes/postRoute.js";
import AppError from "./utils/appError.js";
import errorController from "./controller/errorController.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

app.use(helmet());

if (process.env.NODE_ENV === "DEVELOPMENT") app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many request from this IP, Please try again in an hour!!!",
});

app.use("/api", limiter);

app.use(bodyParser.json({ limit: "30mb", extends: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/posts", postRoute);

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, httpStatus.NOT_FOUND));
});

app.use(errorController);

export default app;
