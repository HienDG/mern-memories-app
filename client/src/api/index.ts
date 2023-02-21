import axios from "axios";

const URL = import.meta.env.VITE_URL;

export interface TPosts {
  [key: string]: string | string[] | number;
  tags: string[];
  selectedFile: string;
  _id: string;
  title: string;
  message: string;
  creator: string;
  likeCount: number;
  created_at: string;
}

export interface TCreateNewPost extends Omit<TPosts, "_id" | "likeCount" | "created_at"> {}

const instance = axios.create({
  baseURL: URL,
  timeout: 10000,
  timeoutErrorMessage: `Request took too long! Please try again`,
});

export const getAllPosts = async (): Promise<TPosts[]> => {
  const response = await instance.get("/posts");
  const { data } = response.data;
  return data.data;
};

export const createNewPost = async (newPost: TCreateNewPost): Promise<TPosts> => {
  console.log(newPost);
  const response = await instance.post("/posts", newPost);
  const { data } = response.data;
  return data.data;
};

export const updatePost = async (post: {
  id: string;
  newPost: TCreateNewPost;
  likeCount?: number;
}): Promise<TPosts> => {
  const response = await instance.patch(`/posts/${post.id}`, {
    ...post.newPost,
  });
  const { data } = response.data;
  return data.data;
};

export const updateLikeCount = async (post: { id: string; like: number }): Promise<TPosts> => {
  const response = await instance.patch(`/posts/${post.id}`, {
    likeCount: post.like,
  });
  const { data } = response.data;
  return data.data;
};

export const deletePost = async (id: string): Promise<void> => {
  const response = await instance.delete(`/posts/${id}`);
};
