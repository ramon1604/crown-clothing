import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.jsx";
import Navigation from "./routes/navigation/navigation.jsx";
import SignPage from "./components/sign-page/sign-page.jsx";
import Checkout from "./components/checkout/checkout.jsx";
import Shop from "./components/shop/shop.jsx";
import ShopCategory from "./components/shopCategory/shopCategory.jsx";

import { useSelector, useDispatch } from "react-redux";
import { updUser } from "./store/slices/userSlice.js";

import {
  authChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.js";

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    authChangedListener((userState) => {
      if (userState !== currentUser) {
        if (userState) {
          createUserDocumentFromAuth(userState, userState.displayName);
        }
      }
      dispatch(updUser(userState));
    });
  }, [dispatch, currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {currentUser ? (
          <Route path="shop" element={<Shop />} />
        ) : (
          <Route path="shop" element={<Home />} />
        )}
        {currentUser ? (
          <Route path="shop/:category" element={<ShopCategory />} />
        ) : (
          <Route path="shop/*" element={<Home />} />
        )}
        <Route path="sign-in" element={<SignPage />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
