import httpStatus from "http-status";
import AppError from "./../utils/appError.js";

const handleCastErrorDB = (error) => {
  console.log(error);
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, httpStatus.BAD_REQUEST);
};

const handleValidateErrorDB = (error) => new AppError(error.message, httpStatus.BAD_REQUEST);

const sendErrorProduction = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: `Something went very wrong`,
    });
  }
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};

const errorController = (error, _req, res, _next) => {
  console.clear();
  error.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "DEVELOPMENT") return sendErrorDev(error, res);
  else if (process.env.NODE_ENV === "PRODUCTION") {
    let err = Object.assign(error);
    // console.log(err.name, "line 39");
    console.log(err._message);
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err._message && err._message.includes("validation failed"))
      err = handleValidateErrorDB(err);
    return sendErrorProduction(err, res);
  }
};

export default errorController;
