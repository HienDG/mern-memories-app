import express from "express";

import * as post from "../controller/postController.js";

const postRoute = express.Router();

postRoute.route("/").get(post.getAllPosts).post(post.createPost);
postRoute.route("/:id").get(post.getPost).patch(post.updatePost).delete(post.deletePost);

export default postRoute;
