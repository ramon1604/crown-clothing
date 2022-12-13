import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cartIcon.scss'
import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
  const { itemsCount } = useContext(CartContext);
  return (
    <div className="cart-icon-container">
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemsCount}</span>
    </div>
  )
};

export default CartIcon;
