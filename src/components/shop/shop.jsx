import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import "./shop.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  const location = useLocation();
  const initHash = location.state.title;
  const navigate = useNavigate();
  const previousPage = () => {
    navigate(-1);
  };


  useEffect(() => {
    console.log(initHash);
    const section = document.getElementById(initHash);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [initHash]);

  return (
    <>
      {products.map(({ title, items }) => (
        <div key={title} className="products-category">
          <span className="arrow" onClick={previousPage}>&#10094;  </span>
          <span id={title}>{title}</span>
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
