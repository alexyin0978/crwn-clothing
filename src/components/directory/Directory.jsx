import {
    CategoriesContainer
} from './Directory.styled';
import DirectoryItem from '../directoryItem/DirectoryItem';
import Categories from '../directoryItem/Categories';

const Directory = () => {
    return(
        <CategoriesContainer>
            {Categories.map(({id, ...otherCategoryProps}) => 
                (
                <DirectoryItem key={id} {...otherCategoryProps} />
                )
            )}
        </CategoriesContainer>  
    )
}

export default Directory;