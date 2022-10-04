import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../axios";
// import { axiosInstance } from "../../axios";
const initialState = {
  accessToken: null,
  refreshToken: null,
};

// LOGIN USER
export const LoginUser = createAsyncThunk(
  "userAuth/LoginUser",
  async (loginDetails) => {
    try {
      const response = await axios.post("/login", {
        username: loginDetails,
      });
      return response.data;
    } catch (e) {
      throw new Error(e?.response?.data.message);
    }
  }
);

export const getToken = createAsyncThunk(
  "userAuth/getToken",
  async (_, { getState }) => {
    const state = getState();
    const { refreshToken } = state.userAuth;
    try {
      const response = await axios.post("/token", {
        token: refreshToken,
      });
      return response.data;
    } catch (e) {
      throw new Error(e?.response?.data.message);
    }
  }
);

// USER AUTH SLICE
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
    setToken: (state, action) => {
      return { ...state, accessToken: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    // builder.addCase(getToken.fulfilled, (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    // });
  },
});

export const { resetUser, setToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
