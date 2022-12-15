import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addCartItem = (cartItems, productToAdd) => {
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

  const removeCartItem = (cartItems, productToAdd) => {
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

  const clearCartItem = (cartItems, productToAdd) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToAdd.id);
  };


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToAdd) => {
    setCartItems(removeCartItem(cartItems, productToAdd));
  };

  const clearItemFromCart = (productToAdd) => {
    setCartItems(clearCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newItemsCount = cartItems.reduce(
      (count, cartItem) => count + cartItem.quantity,
      0
    );
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setItemsCount(newItemsCount);
    setTotal(newTotal);
  }, [cartItems]);

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
