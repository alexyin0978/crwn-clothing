import CategoriesPreview from "../categoriesPreview/CategoriesPreview";
import Category from "../category/Category";

import {Routes, Route} from 'react-router-dom';

const ShopPage = () => {

    return(
        /* nested routes */
        <Routes>
            <Route index element={<CategoriesPreview />} />
            {/* 在url填入/...都會被儲存在category內 */}
            <Route path=':category' element={<Category />} />
        </Routes>
    )
};

export default ShopPage;