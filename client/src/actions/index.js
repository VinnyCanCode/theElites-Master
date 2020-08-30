import history from '../history';
import axios from 'axios';

import {
  SEARCH_TERM,
  SIDEBAR_SEARCH_TERM,
  SEARCH_RESULTS,
  SELECTED_ITEM,
  GEN_SELECT,
  GET_WISHLIST,
  AUTHENTICATED,
  GET_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SIGN_UP,
  GET_CART,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  MINUS_ONE_FROM_CART,
  DELETE_FROM_WISHLIST,
  ADD_TO_WISHLIST,
  SORT_SELECTION,
  COLOR_FILTER,
  BRAND_FILTER,
  PRICE_FILTER,
} from './types';
import { hash } from 'bcryptjs';

export const searchTerm = (value) => async (dispatch) => {
  try {
    const res = await axios.get(`/products/all/${value}`);

    return dispatch({ type: SEARCH_TERM, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const sideBarSearchTerm = (value) => {
  return { type: SIDEBAR_SEARCH_TERM, payload: value.toLowerCase() };
};

export const genSelect = (value) => {
  return { type: GEN_SELECT, payload: value };
};

export const sortProductsBy = (value) => {
  // From low to high
  if (value === 'price:low') {
    return { type: SORT_SELECTION, payload: `price:low` };
  }

  // From high to low
  if (value === 'price:high') {
    return { type: SORT_SELECTION, payload: `price:high` };
  }

  // No sorting
  return { type: SORT_SELECTION, payload: '' };
};

// ADD COLORS TO FILTER PRODUCTS PAGE BY
export const colorFilter = (value) => {
  const validColors = [
    'Blue',
    'Red',
    'White',
    'Black',
    'Yellow',
    'Green',
    'Purple',
    'clear',
  ];

  if (validColors.includes(value)) {
    return { type: COLOR_FILTER, payload: value };
  }

  return { type: COLOR_FILTER, payload: '' };
};

// CHOOSE BRAND TO FILTER PRODUCTS PAGE BY
export const brandFilter = (value) => {
  return { type: BRAND_FILTER, payload: value };
};

// CHOOSE PRICE RANGE TO FILTER PRODUCTS PAGE BY
export const priceFilter = (value) => {
  return { type: PRICE_FILTER, payload: value };
};

export const searchResults = (
  searchTerm = '',
  gen = '',
  sort = '',
  colorFilter = '',
  brandFilter = '',
  priceFilter = ''
) => async (dispatch) => {
  let colorQuery = [];

  if (colorFilter.length > 0) {
    colorQuery = colorFilter;
  }

  try {
    // If no gen but there is a searchTerm
    if (gen.length === 0) {
      const res = await axios.get(
        `/products/${searchTerm}?sortBy=${sort}&byColor=${colorFilter}&byBrand=${brandFilter}&byPrice=${priceFilter}`
      );

      return dispatch({ type: SEARCH_RESULTS, payload: res.data });
    }

    //If searchTerm is 'new' & there is gen
    if (searchTerm === 'new') {
      const res = await axios.get(
        `/products/${gen}?prod=${searchTerm}&sortBy=${sort}&byColor=${colorFilter}&byBrand=${brandFilter}&byPrice=${priceFilter}`
      );

      return dispatch({ type: SEARCH_RESULTS, payload: res.data });
    }

    // If there is a searchTerm & gen
    const res = await axios.get(
      `/products/${gen}?prod=${searchTerm}&sortBy=${sort}&byColor=${colorFilter}&byBrand=${brandFilter}&byPrice=${priceFilter}`
    );

    dispatch({ type: SEARCH_RESULTS, payload: res.data });
  } catch (error) {
    dispatch({ type: SEARCH_RESULTS, payload: [] });
  }
};

export const selectedItem = (routeID) => async (dispatch) => {
  try {
    const res = await axios.get(`/product/${routeID}`);

    dispatch({ type: SELECTED_ITEM, payload: res.data[0] });
  } catch (error) {
    console.log(error);
  }
};

// AUTH NEEDED
// USER ACTIONS

export const logIn = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/login`, {
      email: email,
      password: password,
    });

    // Set Auth to header
    await axios.get('/', {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    // Set Token to local storage
    localStorage.setItem('token', res.data.token);

    return dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (name, email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`/users`, {
      name: name,
      email: email,
      password: password,
    });

    // Set Auth to header
    await axios.get('/', {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });
    // Set Token to local storage
    localStorage.setItem('token', res.data.token);

    dispatch({
      type: SIGN_UP,
      payload: res.data,
    });
    return history.push('/products/new');
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = () => async (dispatch) => {
  // AUTHENTICATE CURRENT USER
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.get(`/user`);

    return dispatch({ type: GET_USER, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await axios.post(`/users/logout`);

    localStorage.removeItem('token');

    return dispatch({ type: LOGOUT_USER });
  } catch (error) {
    console.log(error);
  }
};

// WISHLIST ACTIONS
export const getWishList = () => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.get(`/wishlist`);

    return dispatch({ type: GET_WISHLIST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = (itemId) => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.post(`/wishlist/${itemId}`);

    return dispatch({ type: ADD_TO_WISHLIST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = (itemId) => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.patch(`/wishlist-remove/${itemId}`);

    return dispatch({ type: DELETE_FROM_WISHLIST, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// CART ACTIONS

export const getCart = () => async (dispatch) => {
  // AUTHENTICATE CURRENT USER
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  try {
    const res = await axios.get('/cart');

    return dispatch({ type: GET_CART, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = (itemId) => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.post(`/cart/${itemId}`);

    return dispatch({ type: ADD_ITEM_TO_CART, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = (itemId) => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.patch(`/cart/${itemId}`);

    return dispatch({ type: DELETE_ITEM_FROM_CART, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// {{url}}/cart/minus/5f04f0b58cd3b103f2adabc1

export const subtractOneFromQuantity = (itemId) => async (dispatch) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const res = await axios.patch(`/cart/minus/${itemId}`);

    return dispatch({ type: MINUS_ONE_FROM_CART, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
