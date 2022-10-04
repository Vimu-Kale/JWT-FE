import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "../../axios";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const initialState = {
  posts: null,
};

// GET USER POSTS
export const getUserPosts = createAsyncThunk(
  "userPosts/getUserPosts",
  async (axiosPrivate) => {
    console.log("hii");
    try {
      const response = await axiosPrivate.get("/posts");
      return response.data;
    } catch (e) {
      // console.log(e);
      // console.log(e?.response?.data);
      throw new Error(e?.response?.data);
    }
  }
);

// USER AUTH SLICE
const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    resetUserPosts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { resetUserPosts } = userPostsSlice.actions;
export default userPostsSlice.reducer;
