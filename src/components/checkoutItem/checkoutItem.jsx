import React from "react";
import "./checkoutItem.scss";

const CheckoutItem = ({ cartItem, addHandler, removeHandler, clearHandler }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  const addItemHandler = () => addHandler(cartItem);
  const removeItemHandler = () => removeHandler(cartItem);
  const clearItemHandler = () => clearHandler(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
