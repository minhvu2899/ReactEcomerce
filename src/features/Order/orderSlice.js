import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";
import orderApi from "./../../api/orderApi";

// First, create the thunk
export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (payload) => {
    //call API to register
    const { data } = await orderApi.get(payload);
    console.log(data);
    return data;
  }
);
export const paymentOrder = createAsyncThunk(
  "order/paymentOrder",
  async (payload) => {
    //call API to register
    const { data } = await orderApi.updatePayment(payload);
    console.log(data);
    return data;
  }
);
export const createOrder = createAsyncThunk(
  "cart/createOrder",
  async (payload) => {
    const { data } = await orderApi.add(payload);
    console.log("data", data);
    return data.data.data;
  }
);
// Then, handle actions in your reducers:

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: {},
    isSuccess: false,
    loadingPay: "",
    isPaySuccess: false,
  },
  reducers: {
    reset(state) {
      state.loading = "";
      state.isSuccess = false;
      state.loadingPay = "";
      state.isPaySuccess = false;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed

    [createOrder.fulfilled]: (state, action) => {
      // Add user to the state array
      state.order = action.payload;
      state.isSuccess = true;
    },

    [getOrderDetail.fulfilled]: (state, action) => {
      // Add user to the state array
      state.order = action.payload;
      state.isSuccess = true;
    },
    [paymentOrder.pending]: (state, action) => {
      // Add user to the state array
      state.loadingPay = false;
      state.isPaySuccess = true;
    },

    [paymentOrder.fulfilled]: (state, action) => {
      // Add user to the state array
      state.order = action.payload;
      state.loadingPay = false;
    },
  },
});

const { reducer } = orderSlice;
export const { reset } = orderSlice.actions;
export default reducer; //default export
