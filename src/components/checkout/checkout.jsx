import React, { useContext } from "react";
import "./checkout.scss";
import { CartContext } from "../../contexts/cartContext.jsx";
import CheckoutItem from "../checkoutItem/checkoutItem";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart , total } =
    useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem key={cartItem.id}
            className={`checkout-header`}
            cartItem={cartItem}
            addHandler={addItemToCart}
            removeHandler={removeItemFromCart}
            clearHandler={clearItemFromCart}
          />
        );
      })}
      <div className={`total`}>Total: ${total}</div>
    </div>
  );
};
export default Checkout;
