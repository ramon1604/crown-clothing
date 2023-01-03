import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

import styles from "./shop.module.scss";

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
    const obj = document.querySelector(`#${title}ShopContainer`);
    let signOp = 0;
    if (e.target.className === (styles.arrowLeft)) {
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
    const rArrow = document.querySelector(`#${title}arrowRight`);
    const lArrow = document.querySelector(`#${title}arrowLeft`);
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
        <div key={title} className={styles.shopCategory}>
          <span title="Previous Page" className={styles.arrow} onClick={previousPage}>
            &#10094;{" "}
          </span>
          <Link to={title.toLowerCase()}>
          <span title="Shop by Category" id={title}>{title}</span>
          </Link>
          <span id={`${title}arrowLeft`} onClick={(e) => scroll(e, title)} className={styles.arrowLeft}>
            &#10094;
          </span>
          <span id={`${title}arrowRight`} onClick={(e) => scroll(e, title)} className={styles.arrowRight}>
            &#10095;
          </span>
          <div id={`${title}ShopContainer`} key={title} className={`${styles.shopContainer}`}>
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
