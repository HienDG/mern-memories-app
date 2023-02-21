import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllPosts, updatePost as update, createNewPost } from "../api";
import type { TPosts } from "../api";
import STATUS from "../constants/status";

import type { TCreateNewPost } from "../api";

const initialState = {
  posts: [] as TPosts[],
  status: STATUS.IDLE,
  post: {} as TPosts,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    save(state, action: PayloadAction<string>) {
      const id = action.payload;
      const [post]: TPosts[] = state.posts.filter((p) => p._id === id);
      state.post = post;
    },
    updateLike(state, action: PayloadAction<{ id: string; like: number }>) {
      const { id, like } = action.payload;
      const existingPost = state.posts.find((post) => post._id === id);
      const existingIndex = state.posts.findIndex((post) => post._id === id);
      if (existingPost) {
        existingPost.likeCount = like;
        state.posts[existingIndex] = existingPost;
      }
    },
    deletePostFromPosts(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (build) =>
    build
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.posts = action.payload;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
      .addCase(uploadNewPost.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(uploadNewPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.posts.push({
          ...action.payload,
        });
        state.status = STATUS.SUCCESS;
      })
      .addCase(uploadNewPost.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<TPosts>) => {
        const newPost = action.payload;
        const existingIndex = state.posts.findIndex((post) => post._id === newPost._id);
        state.posts[existingIndex] = newPost;

        state.status = STATUS.SUCCESS;
      })
      .addCase(updatePost.rejected, (state) => {
        state.status = STATUS.ERROR;
      }),
});

export const fetchAllPosts = createAsyncThunk("fetch/posts", async () => {
  const data = await getAllPosts();
  return data;
});

export const uploadNewPost = createAsyncThunk(
  "upload/new_post",
  async (newPost: TCreateNewPost) => {
    const data = await createNewPost(newPost);
    return data;
  }
);

export const updatePost = createAsyncThunk(
  "update/post",
  async (post: { id: string; newPost: TCreateNewPost }) => {
    const data = await update(post);
    return data;
  }
);

export const { save, updateLike, deletePostFromPosts } = postSlice.actions;

export default postSlice;
