import React, { useContext } from "react";

import "./directory.scss";
import CategoryContainer from "../categoryContainer/categoryContainer.jsx";
import { ProductsContext } from "../../contexts/productsContext.jsx";

const Directory = () => {
  const { directories } = useContext(ProductsContext);
  return (
    <div className="directories-container">
      {directories.map(({ id, title, imageUrl }) => (
        <CategoryContainer
          key={id}
          title={title}
          image={imageUrl}
        />
      ))}
    </div>
  );
};
export default Directory;
