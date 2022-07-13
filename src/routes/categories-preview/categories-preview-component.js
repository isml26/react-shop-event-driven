import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview-component";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  console.log(isLoading)
  return (
    <Fragment>
      {isLoading
        ? (<Spinner />)
        : Object.keys(categoriesMap).map((key) => {
            const products = categoriesMap[key];
            return (
              <CategoryPreview key={key} title={key} products={products} />
            );
          })}
    </Fragment>
  );
}

export default CategoriesPreview;
