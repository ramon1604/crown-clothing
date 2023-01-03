import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import styles from './cartIcon.module.scss'
import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
  const { itemsCount } = useContext(CartContext);
  return (
    <div className={styles.cartIconContainer}>
        <ShoppingIcon className={styles.shoppingIcon} />
        <span className={styles.itemCount}>{itemsCount}</span>
    </div>
  )
};

export default CartIcon;
