import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.jsx";
import styles from "./cartDropdown.module.scss";
import "../cartItem/cartItem.jsx";
import CartItem from "../cartItem/cartItem.jsx";
import { CartContext } from "../../contexts/cartContext.jsx";

const CartDropdown = ({ handlerDropdown }) => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const checkoutHandler = () => {
    handlerDropdown();
    navigate('/checkout');
  }
  return (
    <div className={styles.cartDropdownContainer}>
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button type={`button`} btnClass={``} onClick={checkoutHandler} >Checkout</Button>
    </div>
  );
};

export default CartDropdown;
