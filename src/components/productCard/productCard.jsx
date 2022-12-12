import React, { useContext } from "react";
import "./productCard.scss";
import Button from "../button/button.jsx";
import { CartContext } from "../../contexts/cartContext.jsx";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" clickHandler={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
