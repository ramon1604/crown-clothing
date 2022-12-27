import React, { createContext, useState, useEffect } from "react";

import { PRODUCTS } from "../shop-data.js";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.js";

export const ProductsContext = createContext();

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(PRODUCTS);
  const values = { products, setProducts };

  useEffect(() => {
    addCollectionAndDocuments("hats", "categories", PRODUCTS);
  }, []);

  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  );
};
