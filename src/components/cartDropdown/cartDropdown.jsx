import React, { useContext } from "react";
import Button from "../button/button.jsx";
import "./cartDropdown.scss";
import "../cartItem/cartItem.jsx";
import CartItem from "../cartItem/cartItem.jsx";
import { CartContext } from "../../contexts/cartContext.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button type={`button`} btnClass={``} >Checkout</Button>
    </div>
  );
};

export default CartDropdown;
