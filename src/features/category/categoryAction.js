import { fetchAllCategories, fetchCategoryProductsApi } from "./categoryAPI";
import {
  setCategories,
  setLoading,
  setError,
  setSubCategories,
} from "./categorySlice";

export const fetchAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetchAllCategories();

    if (response.status === "success") {
      dispatch(setCategories(response.categories));
      dispatch(setSubCategories(response.subCategories));
    } else {
      dispatch(setError(response.message || "Unable to fetch categories"));
    }
  } catch (error) {
    dispatch(
      setError(error.message || "Network error while fetching categories")
    );
  }
};

export const fetchCategoryProductsAction = async (slug) => {
  const result = await fetchCategoryProductsApi(slug);
  return result;
};

