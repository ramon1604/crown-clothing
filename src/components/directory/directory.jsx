import React from "react";

import './directory.scss'
import CategoryContainer from '../categoryContainer/categoryContainer.jsx'
import directories from './directory.json'

const Directory = () => {
  return (
    <div className="directories-container">
      {directories.map(({ id, title, imageUrl }) => (
        <CategoryContainer key={id} title={title} image={imageUrl} />
      ))}
    </div>
  )
}
export default Directory