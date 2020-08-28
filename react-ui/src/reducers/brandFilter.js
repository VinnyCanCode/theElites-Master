import { BRAND_FILTER } from '../actions/types';

export default (state = '', action) => {
  if (action.type === BRAND_FILTER) {
    // If action.payload is clear, clear priceFilter's state
    if (action.payload === 'clear') {
      return '';
    }

    if (state === action.payload) {
      return '';
    }

    return action.payload;
  }

  return state;
};
