import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import "./shop.scss";

let initHash;
let scrollPos = 0;
let prevTitle = '';

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
    const section = document.querySelector("#"+initHash);
    section && section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scroll = (e, title) => {
    const obj = document.querySelector(
      "." + title + ".products-container"
    );
    let signOp = 0;
    if (e.target.className === (title + " arrowLeft")) {
      signOp = 1;
    } else {
      signOp = -1;
    }
    obj.scrollBy(signOp * (obj.children[0].offsetWidth + 8), 0);
    hideShowArrows(title, obj);
  };

  const hideShowArrows = (title, obj) => {
    if (prevTitle !== title) {scrollPos = 0};
    prevTitle = title;
    const rArrow = document.querySelector("." + title + ".arrowRight");
    const lArrow = document.querySelector("." + title + ".arrowLeft");
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
    } else {
      lArrow.style.visibility = "visible";
    }
    scrollPos = obj.scrollLeft;
  };

  return (
    <>
      {products.map(({ title, items }) => (
        <div key={title} className="products-category">
          <span className="arrow" onClick={previousPage}>
            &#10094;{" "}
          </span>
          <span id={title}>{title}</span>
          <span onClick={(e) => scroll(e, title)} className={title + " arrowLeft"}>
            &#10094;
          </span>
          <span onClick={(e) => scroll(e, title)} className={title + " arrowRight"}>
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
