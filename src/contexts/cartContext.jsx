import React, { createContext, useReducer } from "react";
import { actionReducer } from "../utils/functions/functions";

export const CartContext = createContext();

const REDUCER_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case `UPDATE_CART_ITEMS`:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = (props) => {
  const [{ cartItems, itemsCount, total }, dispatch] = useReducer(
    cartReducer,
    REDUCER_INITIAL_STATE
  );

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (count, cartItem) => count + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      actionReducer(`UPDATE_CART_ITEMS`, {
        cartItems: newCartItems,
        itemsCount: newCartCount,
        total: newCartTotal,
      })
    );
  };

  const addCartItem = (productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

  const removeCartItem = (productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id && cartItem.quantity > 1
    );
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    } else {
      return cartItems.filter((cartItem) => cartItem.id !== productToAdd.id);
    }
  };

  const clearCartItem = (productToAdd) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToAdd.id);
  };

  const addItemToCart = (productToAdd) => {
    updateCartItems(addCartItem(productToAdd));
  };

  const removeItemFromCart = (productToAdd) => {
    updateCartItems(removeCartItem(productToAdd));
  };

  const clearItemFromCart = (productToAdd) => {
    updateCartItems(clearCartItem(productToAdd));
  };

  const values = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    itemsCount,
    total,
  };
  return (
    <CartContext.Provider value={values}>{props.children}</CartContext.Provider>
  );
};
