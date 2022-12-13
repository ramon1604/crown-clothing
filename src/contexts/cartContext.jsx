import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

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

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() =>{
    const newItemsCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setItemsCount(newItemsCount);
  },[cartItems])

  const values = { cartItems, addItemToCart, itemsCount };
  return (
    <CartContext.Provider value={values}>{props.children}</CartContext.Provider>
  );
};
