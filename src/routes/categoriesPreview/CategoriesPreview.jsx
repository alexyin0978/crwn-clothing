import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../contexts/CategoriesContext";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";

const CategoriesPreview = () => {

  //1.將categoriesMap-context-state帶入ShopPage
  const {categoriesMap} = useContext(CategoriesContext);

  return(
    <Fragment>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title];
        return(
          <CategoryPreview 
          key={title}
          title={title}
          products={products}
          />
        )
      })}
    </Fragment>
  )
}

export default CategoriesPreview;


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