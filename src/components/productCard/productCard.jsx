import React, { useContext } from "react";
import styles from "./productCard.module.scss";
import Button from "../button/button.jsx";
import { CartContext } from "../../contexts/cartContext.jsx";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <div className={styles.productCardContainer}>
      <img src={imageUrl} alt={`${name}`} />
      <div className={styles.footer}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{price}</span>
      </div>
      <Button type={`button`} btnClass={``} onClick={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
