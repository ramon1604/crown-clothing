import React, { useContext } from "react";

import "./directory.scss";
import CategoryContainer from "../categoryContainer/categoryContainer.jsx";
import { ProductsContext } from "../../contexts/productsContext.jsx";

const Directory = () => {
  const { directories } = useContext(ProductsContext);
  if (directories) {
    return (
      <div className="directories-container">
        {directories.map(({ id, title, imageUrl }) => (
          <CategoryContainer key={id} title={title} image={imageUrl} />
        ))}
      </div>
    );
  } else {
    return <h1>Categories not available</h1>;
  }
};
export default Directory;
