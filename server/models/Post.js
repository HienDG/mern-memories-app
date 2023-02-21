import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: [6, "Must be at least 6 characters, got {VALUE}"],
    trim: true,
    required: [true, "Please, post must have title"],
  },
  message: {
    type: String,
    trim: true,
  },
  creator: {
    type: String,
    default: "anonymous",
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  tags: [String],
  selectedFile: {
    type: String,
    default:
      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
