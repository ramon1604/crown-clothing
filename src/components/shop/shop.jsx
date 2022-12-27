import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import "./shop.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  const location = useLocation();
  let initHash;
  if (location.state === null) {
    initHash = 'Hats';
  } else {
    initHash = location.state.title;
  }
  const navigate = useNavigate();

  const previousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const section = document.getElementById(initHash);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [initHash]);

  return (
    <>
      {products.map(({ title, items }) => (
        <div key={title} className="products-category">
          <span className="arrow" onClick={previousPage}>
            &#10094;{" "}
          </span>
          <span id={title}>{title}</span>
          <span className="arrowLeft">&#10094;</span>
          <span className="arrowRight">&#10095;</span>
          <div key={title} className="products-container">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Shop;
