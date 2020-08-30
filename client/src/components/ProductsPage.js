import React, { useEffect } from 'react';
import ItemCard from './ItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { searchResults, sideBarSearchTerm } from '../actions';

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const searchByQuery = props.match.url.split('/')[2];
  const products = useSelector((state) => state.searchResults);
  const gen = useSelector((state) => state.genSelect);
  const sort = useSelector((state) => state.sortProductsBy);
  const colorFilter = useSelector((state) => state.colorFilter);
  const brandFilter = useSelector((state) => state.brandFilter);
  const priceFilter = useSelector((state) => state.priceFilter);

  if (window.performance) {
    if (performance.navigation.type == 1) {
      alert('This page is reloaded');
    } else {
      alert('This page is not reloaded');
    }
  }

  // Change ProductPage state by URL
  useEffect(() => {
    dispatch(
      searchResults(
        searchByQuery,
        gen,
        sort,
        colorFilter,
        brandFilter,
        priceFilter
      )
    );
  }, [searchByQuery, gen, sort, colorFilter, brandFilter, priceFilter]);

  // Change sideBarSearchTerm state by URL
  useEffect(() => {
    dispatch(sideBarSearchTerm(searchByQuery));
  }, [searchByQuery]);

  let productsMap = (products) => {
    if (products.length === 0) {
      return (
        <div>
          <h1>No products found</h1>
        </div>
      );
    }

    return Array.from(products).map((product) => (
      <ItemCard props={product} key={product.name} />
    ));
  };

  return <div className="productsPage">{productsMap(products)}</div>;
};

export default ProductsPage;
