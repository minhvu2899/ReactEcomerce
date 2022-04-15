import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "./../../api/cartApi";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (payload) => {
    const { data } = await cartApi.getAll();

    return data.data;
  }
);
export const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  const { data } = await cartApi.add(payload);

  return data.data;
});
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload) => {
    await cartApi.remove(payload);

    return payload;
  }
);
export const resetCart = createAsyncThunk("cart/resetCart", async (payload) => {
  await cartApi.reset();

  return payload;
});
export const updateCartItems = createAsyncThunk(
  "cart/updateCartItems",
  async (payload) => {
    const { data } = await cartApi.update(payload);

    return data.data.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(sessionStorage.getItem("cartItems")) || [],
  },

  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((x) => x.product.id === id);
      //check if product is available in cart
      // const index = state.cartItems.findIndex((x) => x.id === id);
      if (index >= 0) {
        const newItems = JSON.parse(JSON.stringify(state.cartItems));
        newItems[index].quantity = quantity;
        state.cartItems = newItems;
        sessionStorage.setItem("cartItems", JSON.stringify(newItems));
      }
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed

    [removeFromCart.fulfilled]: (state, action) => {
      const newItems = JSON.parse(JSON.stringify(state.cartItems));

      state.cartItems = newItems.filter((x) => x._id !== action.payload);

      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.cartItems = [];
      sessionStorage.setItem("cartItems", []);
    },
    [getCartItems.fulfilled]: (state, action) => {
      // Add user to the state array
      state.cartItems = action.payload;
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    [updateCartItems.fulfilled]: (state, action) => {
      // Add user to the state array
      const index = state.cartItems.findIndex(
        (x) => x._id === action.payload._id
      );
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    [addToCart.fulfilled]: (state, action) => {
      // Add user to the state array
      state.showMiniCart = true;
      const index = state.cartItems.findIndex(
        (x) => x.product.id === action.payload.product.id
      );
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  hideMiniCart,
  showMiniCart,
  addShippingAddress,
  addPaymentMethod,
  // addToCart,
  // removeFromCart,
  setQuantity,
} = actions; //named export
export default reducer; //default export
