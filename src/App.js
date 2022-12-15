import React, { useContext } from "react";
import { UserContext } from "./contexts/userContext.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.jsx";
import Navigation from "./routes/navigation/navigation.jsx";
import SignPage from "./components/sign-page/sign-page.jsx";
import Shop from "./components/shop/shop.jsx";
import Checkout from "./components/checkout/checkout.jsx";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {currentUser ? (
          <Route path="shop" element={<Shop />} />
        ) : (
          <Route path="shop" element={<Home />} />
        )}
        <Route path="sign-in" element={<SignPage />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
