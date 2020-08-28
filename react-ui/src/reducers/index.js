import { combineReducers } from 'redux';
import searchTerm from './searchTerm';
import sideBarSearchTerm from './sideBarSearchTerm';
import searchResults from './searchResults';
import selectedItem from './selectedItem';
import genSelect from './genSelect';
import wishlist from './wishlistReducers/wishlist';
import auth from './userReducers/auth';
import cart from './cartReducer';
import sortProductsBy from './sortProductsByReducer';
import colorFilter from './colorFilter';
import brandFilter from './brandFilter';
import priceFilter from './priceFilter';

export default combineReducers({
  searchTerm,
  sideBarSearchTerm,
  searchResults,
  sortProductsBy,
  colorFilter,
  brandFilter,
  priceFilter,
  selectedItem,
  genSelect,
  wishlist,
  auth,
  cart,
});
