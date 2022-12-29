import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import "./shop.scss";

let initHash;

const Shop = () => {
  const { products } = useContext(ProductsContext);
  const location = useLocation();

  if (location.state === null) {
    initHash = "Hats";
  } else {
    initHash = location.state.title;
  }
  const navigate = useNavigate();

  const previousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const section = document.getElementById(initHash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const scrollLeft = (title) => {
    var left = document.querySelector("." + title);
    left.scrollBy(window.innerWidth/5.26, 0);
  };

  const scrollRight = (title) => {
    var right = document.querySelector("." + title);
    right.scrollBy(-window.innerWidth/5.26, 0);
  };

  return (
    <>
      {products.map(({ title, items }) => (
        <div key={title} className="products-category">
          <span className="arrow" onClick={previousPage}>
            &#10094;{" "}
          </span>
          <span id={title}>{title}</span>
          <span onClick={() => scrollLeft(title)} className="arrowLeft">
            &#10094;
          </span>
          <span onClick={() => scrollRight(title)} className="arrowRight">
            &#10095;
          </span>
          <div key={title} className={`${title} products-container`}>
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
