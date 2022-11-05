import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.jsx";
import Navigation from "./routes/navigation/navigation.jsx";
import SignPage from "./components/sign-page/sign-page.jsx";

const Shop = () => (
  <div>
    <h1>Shop</h1>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignPage />} />
      </Route>
    </Routes>
  );
};

export default App;
