import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";

// First, create the thunk
export const register = createAsyncThunk("users/register", async (payload) => {
  //call API to register
  const response = await userApi.register(payload);
  //save data to local storage
  // localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
  // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  //return data user
  const { data, token } = response.data;
  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));
  return data;
});
export const login = createAsyncThunk("users/login", async (payload) => {
  //call API to register

  const response = await userApi.login(payload);
  const { data, token } = response.data;
  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));
  //return data user
  return data;
});
export const getUserLoginGoogle = createAsyncThunk(
  "users/getUserLoginGoogle",
  async (payload) => {
    //call API to register

    const response = await userApi.login(payload);
    const { data } = response;
    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));
    //return data user
    return data;
  }
);
// Then, handle actions in your reducers:

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    isLogin: !!JSON.parse(localStorage.getItem(StorageKeys.USER)) || false,
  },
  reducers: {
    updateUser(state, action) {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.USER, JSON.stringify(action.payload));
    },
    logout(state) {
      //clear localStorage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      sessionStorage.removeItem(StorageKeys.CART);
      //
      state.current = {};
      state.isLogin = false;
    },
    updateLoginGoogle(state, action) {
      state.current = action.payload.user;
      state.isLogin = true;
      localStorage.setItem(StorageKeys.TOKEN, action.payload.accessToken);
      localStorage.setItem(
        StorageKeys.USER,
        JSON.stringify(action.payload.user)
      );
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [register.fulfilled]: (state, action) => {
      // Add user to the state array
      state.current = action.payload.data;
      state.isLogin = true;
    },

    [login.fulfilled]: (state, action) => {
      // Add user to the state array
      state.current = action.payload.data;
      state.isLogin = true;
    },
    [login.rejected]: (state, action) => {
      // Add user to the state array
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, updateLoginGoogle, updateUser } = actions;
export default reducer; //default export
