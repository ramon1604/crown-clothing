import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./shopCategory.module.scss";

import { ProductsContext } from "../../contexts/productsContext.jsx";
import ProductCard from "../productCard/productCard.jsx";

const ShopCategory = () => {
  const { category } = useParams();
  const { products } = useContext(ProductsContext);
  window.scrollTo(0, 0);
  return (
    <>
      {products.map(
        ({ title, items }) =>
          title.toLowerCase() === category && (
            <div key={title} className={styles.shopCategoryContainer}>
              <span className={styles.title}>{title}</span>
              <div key={title} className={styles.shopCategoryItemsContainer}>
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
      )}
    </>
  );
};

export default ShopCategory;
