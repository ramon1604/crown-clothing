import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import "./shop.scss";

let initHash;
let scrollPos = 0;

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
    section && section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollLeft = (title) => {
    const left = document.querySelector("." + title);
    left.scrollBy(window.innerWidth / 5.26, 0);
    hideShowArrows(left);
  };

  const scrollRight = (title) => {
    const right = document.querySelector("." + title);
    right.scrollBy(-window.innerWidth / 5.26, 0);
    hideShowArrows(right);
  };

  const hideShowArrows = (obj) => {
    const rArrow = document.querySelector("#aRight");
    const lArrow = document.querySelector("#aLeft");
    if (obj.scrollLeft) {
      rArrow.style.visibility = "visible";
    } else {
      rArrow.style.visibility = "hidden";
    }
    if (scrollPos) {
      if (scrollPos === obj.scrollLeft) {
        lArrow.style.visibility = "hidden";
      } else {
        lArrow.style.visibility = "visible";
      }
      scrollPos = obj.scrollLeft;
    } else {
      scrollPos = obj.scrollLeft;
      lArrow.style.visibility = "visible";
    }
  };

  return (
    <>
      {products.map(({ title, items }) => (
        <div key={title} className="products-category">
          <span className="arrow" onClick={previousPage}>
            &#10094;{" "}
          </span>
          <span id={title}>{title}</span>
          <span
            id="aLeft"
            onClick={() => scrollLeft(title)}
            className="arrowLeft"
          >
            &#10094;
          </span>
          <span
            id="aRight"
            onClick={() => scrollRight(title)}
            className="arrowRight"
          >
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
