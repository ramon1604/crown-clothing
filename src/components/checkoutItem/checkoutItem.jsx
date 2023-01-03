import React from "react";
import styles from "./checkoutItem.module.scss";

const CheckoutItem = ({ cartItem, addHandler, removeHandler, clearHandler }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  const addItemHandler = () => addHandler(cartItem);
  const removeItemHandler = () => removeHandler(cartItem);
  const clearItemHandler = () => clearHandler(cartItem);

  return (
    <div className={styles.checkoutItemContainer}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className={styles.name}> {name} </span>
      <span className={styles.quantity}>
        <div className={styles.arrow} onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className={styles.price}> {price}</span>
      <div className={styles.removeButton} onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
