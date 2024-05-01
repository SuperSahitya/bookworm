"use client";
import React, { useReducer } from "react";
import CartContext from "../contexts/cartContext";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item._id === action.item._id);
      console.log(action.item._id);

      if (!existingItem) {
        return [...state, action.item];
      } else {
        return state.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    case "UPDATE_CART":
      return action.cart;
    case "INCREMENT_QUANTITY":
      return state.map((item) =>
        item._id === action.item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREMENT_QUANTITY":
      return state.map((item) =>
        item._id === action.item.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.item.id);

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
