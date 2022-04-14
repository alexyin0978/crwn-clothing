import {
  CategoryContainer,
  CategoryTitle
} from './Category.styled';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/CategoriesContext';
import ProductCard from '../../components/productCard/ProductCard';

const Category = () => {

  //1.先將params儲存
  const {category} = useParams();

  //2.將categoriesMap匯入(以供之後需要決定render哪個product)
  const {categoriesMap} = useContext(CategoriesContext);

  //3.設定state來儲存categoriesMap的products資訊
  //以供之後決定要render哪個product資訊
  const [products, setProducts] = useState(categoriesMap[category]);
  //default product為[], 也可寫成上面方式
  //因為categoriesMap一開始為empty {}

  //4.在category有變動或是categoriesMap有變動時重新設定products
  useEffect(()=>{

    //a.重設product
    setProducts(categoriesMap[category]);

    //b.在category或categoriesMap有變動時
  }, [category, categoriesMap]);

  return(
    <Fragment>
      <CategoryTitle>
        {category}
      </CategoryTitle>
      <CategoryContainer>
        {
          /* products若仍為undefined
          則不render ProductCard */
          products && 
          products.map(product=>(
            <ProductCard 
            key={product.id} 
            product={product} />
          ))
          /*
          因為products需從categoriesMap取得,
          而categoriesMap需await Firebase.js的回覆
          在得到回覆前會是empty{}
          而Category.jsx是sync function
          因此會出現products一開始是undefined
          (因為試圖從empty obj去得到props)
          */
        }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

/*
categoriesMap資料格式
1.全部產品
{
	hats: [prd1, prd2, ...],
	jackets: [prd1, prd2, ...],
	mens: [prd1, prd2, ...],
	sneakers: [prd1, prd2, ...],
	womens: [prd1, prd2, ...],
}

2.個別產品
hats: [
	{
		name: 'Brown Brim',
		price: 25,
		imageUrl: '...',
		id: 1
	},
	{this is obj2},
	{this is obj3},
	...
]
*/