import React, { useContext } from "react";
import styles from "./checkout.module.scss";
import { CartContext } from "../../contexts/cartContext.jsx";
import CheckoutItem from "../checkoutItem/checkoutItem";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart , total } =
    useContext(CartContext);
  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutHeader}>
        <div className={styles.headerBlock}>
          <span>Product</span>
        </div>
        <div className={styles.headerBlock}>
          <span>Description</span>
        </div>
        <div className={styles.headerBlock}>
          <span>Quantity</span>
        </div>
        <div className={styles.headerBlock}>
          <span>Price</span>
        </div>
        <div className={styles.headerBlock}>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem key={cartItem.id}
            className={styles.checkoutHeader}
            cartItem={cartItem}
            addHandler={addItemToCart}
            removeHandler={removeItemFromCart}
            clearHandler={clearItemFromCart}
          />
        );
      })}
      <div className={styles.total}>Total: ${total}</div>
    </div>
  );
};
export default Checkout;
