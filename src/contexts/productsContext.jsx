import React, { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(PRODUCTS);
  const values = { products, setProducts };
  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  );
};
