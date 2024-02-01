import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "nameAtoZ",
  filters: {
    text: "",
    company: "all",
    category: "all",
    maxPrice: 0,
    minPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    state: { products },
  } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products, state.sort]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

  const displayGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const displayListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const changeSortOption = (event) => {
    dispatch({ type: UPDATE_SORT, payload: event });
  };

  return (
    <FilterContext.Provider
      value={{ state, displayGridView, displayListView, changeSortOption }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
