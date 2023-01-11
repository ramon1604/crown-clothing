import React, { createContext, useReducer, useEffect, useContext } from "react";
import { UserContext } from "./userContext.jsx";
import { actionReducer } from "../utils/functions/functions";

import { PRODUCTS } from "../shop-data.js";
import DIRECTORIES from "../components/directory/directory.json";

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
    case `UPDATE_DIRECTORIES`:
      return {
        ...state,
        ...payload,
      };
    case `UPDATE_PRODUCTS`:
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

  const { currentUser } = useContext(UserContext);

  const updateDirectories = async () => {
    addCollectionAndDocuments("hats", "directories", DIRECTORIES);
    console.log(`loading directories from firebase..`);
    const newDirectories = await getCategoriesAndDocuments("directories");
    dispatch(
      actionReducer(`UPDATE_DIRECTORIES`, {
        directories: newDirectories,
      })
    );
  };

  const updateProducts = async () => {
    addCollectionAndDocuments("hats", "categories", PRODUCTS);
    console.log(`loading products from firebase..`);
    const newProducts = await getCategoriesAndDocuments("categories");
    dispatch(
      actionReducer(`UPDATE_PRODUCTS`, {
        products: newProducts,
      })
    );
  };

  useEffect(() => {
    !currentUser && updateDirectories();
    currentUser && updateProducts();
  }, [currentUser]);

  const values = { products, directories };

  return (
    <ProductsContext.Provider value={values}>
      {props.children}
    </ProductsContext.Provider>
  );
};
