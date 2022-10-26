import './categoryContainer.scss'

const CategoryContainer = ({ title, image }) => {

    return (
        <div className="category-container">
        <div className={`background-image`} style={{
          backgroundImage: `url(${ image })`
        }} />
        <div className="category-body-container">
          <h2>{ title }</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )
}
export default CategoryContainer