import { createSelector } from "@reduxjs/toolkit";

const cartItemSelector = (state) => state.cart.cartItems;

export const cartItemsCountSelector = createSelector(
  cartItemSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);
export const cartItemsTotalSelector = createSelector(
  cartItemSelector,
  (cartItems) =>
    cartItems.reduce(
      (total, item) => total + item.quantity * item.product.priceSale,
      0
    )
);

// const totalCartItem = cartItems.reduce((count, item) => count + item.quantity, 0)
// const totalCartItems = cartItems.reduce((total, item) =>

//     total + item.quantity * (item.variant ? item.variant.salePrice : item.product.salePrice), 0)
