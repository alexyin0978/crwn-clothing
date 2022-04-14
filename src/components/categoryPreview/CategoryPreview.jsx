import ProductCard from '../productCard/ProductCard';

import {
  CategoryPreviewContainer,
  Title,
  Preview
} from './CategoryPreview.styled';

//這個可以刪除
import {Link} from 'react-router-dom';

const CategoryPreview = ({title, products}) => {
  return(
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>
          {title.toUpperCase()}
        </Title>
      </h2>
      <Preview>
        {
          products
          //一次只顯示4個product
          .filter((product, idx)=>(idx<4))
          .map(product=>(
            <ProductCard 
            key={product.id}
            product={product} />
          ))
        }
      </Preview>
    </CategoryPreviewContainer>
  )
};

export default CategoryPreview;

/*
categoriesMap資料格式
1.全部產品
{
	hats: [obj1, obj2, ...],
	jackets: [obj1, obj2, ...],
	mens: [obj1, obj2, ...],
	sneakers: [obj1, obj2, ...],
	womens: [obj1, obj2, ...]
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