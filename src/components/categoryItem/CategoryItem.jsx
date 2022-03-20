import './CategoryItem.scss';

const CategoryItem = ({title, imageUrl}) => {
    return(
        <div className="category-container">
            <div 
            className="background-image" 
            style={{backgroundImage: `url(${imageUrl})`}}
            />  {/* 這個用來放category背景照 */}
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Shop Now</p>
            </div>
        </div>  
    )
}

export default CategoryItem;