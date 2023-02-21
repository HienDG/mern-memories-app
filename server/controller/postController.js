import httpStatus from "http-status";

import Post from "../models/Post.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const handleError = (message, statusCode, next) => next(new AppError(message, statusCode));

export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().select("-__v");

  res.status(httpStatus.OK).json({
    status: "success",
    request_time: req.requestTime,
    data: {
      data: posts,
    },
  });
});
export const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) return handleError("No document found with that id", httpStatus.NOT_FOUND, next);

  res.status(httpStatus.OK).json({
    status: "success",
    request_time: req.requestTime,
    data: {
      data: post,
    },
  });
});
export const createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    request_time: req.requestTime,
    data: {
      data: newPost,
    },
  });
});
export const updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) return handleError("No document found with that id", httpStatus.NOT_FOUND, next);
  res.status(httpStatus.OK).json({
    status: "success",
    request_time: req.requestTime,
    data: {
      data: post,
    },
  });
});
export const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post) return handleError("No document found with that id", httpStatus.NOT_FOUND, next);

  res.status(httpStatus.NO_CONTENT).json({
    status: "success",
    request_time: req.requestTime,
    data: null,
  });
});
