import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";
import orderReducer from "../features/Order/orderSlice";
const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
