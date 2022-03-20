import './Directory.scss';
import CategoryItem from '../categoryItem/CategoryItem';
import Categories from '../categoryItem/Categories';

const Directory = () => {
    return(
        <div className="categories-container">
            {Categories.map(({id, ...otherCategoryProps}) => 
                (
                <CategoryItem key={id} {...otherCategoryProps} />
                )
            )}
        </div>  
    )
}

export default Directory;