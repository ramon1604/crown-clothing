import React, { createContext, useReducer } from "react";
import { actionReducer } from "../utils/functions/functions";

import { PRODUCTS } from "../shop-data.js";
import DIRECTORIES  from "../components/directory/directory.json";

import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.js";

export const ProductsContext = createContext();

const REDUCER_INITIAL_STATE = {
  products: [],
  directories: [],
};

const productsDirectoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case `UPDATE_PRODUCTS_DIRECTORIES`:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const ProductsProvider = (props) => {
  const [{ products, directories }, dispatch] = useReducer(
    productsDirectoriesReducer,
    REDUCER_INITIAL_STATE
  );

  const updateProductsDirectories = async () => {
    addCollectionAndDocuments("hats", "categories", PRODUCTS);
    addCollectionAndDocuments("hats", "directories", DIRECTORIES);
    const newProducts = await getCategoriesAndDocuments("categories");
    const newDirectories = await getCategoriesAndDocuments("directories");
    dispatch(
      actionReducer(`UPDATE_PRODUCTS_DIRECTORIES`, {
        products: newProducts,
        directories: newDirectories,
      })
    );
  };

  updateProductsDirectories();

  const values = { products, directories };

  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  );
};
