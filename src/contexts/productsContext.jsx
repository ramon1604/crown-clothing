import React, { createContext, useState, useEffect } from "react";

//import { PRODUCTS } from "../shop-data.js";
//import DIRECTORIES  from "../components/directory/directory.json";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.js";

export const ProductsContext = createContext();

let PRODUCTS = [];
let DIRECTORIES = [];

export const ProductsProvider = (props) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [directories, setDirectories] = useState(DIRECTORIES); 
  const values = { products, setProducts, directories, setDirectories };

  useEffect(() => {
    addCollectionAndDocuments("hats", "categories", PRODUCTS);
    addCollectionAndDocuments("hats", "directories", DIRECTORIES);
    (async () => {
      PRODUCTS = await getCategoriesAndDocuments("categories");
      setProducts(PRODUCTS);
      DIRECTORIES = await getCategoriesAndDocuments("directories");
      setDirectories(DIRECTORIES);
    })();
  }, []);

  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  );
};
