import {
  GET_CART,
  LOGOUT_USER,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  MINUS_ONE_FROM_CART,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.payload;
      break;
    case LOGOUT_USER:
      return [];
      break;
    case ADD_ITEM_TO_CART:
      return action.payload;
      break;
    case DELETE_ITEM_FROM_CART:
      return action.payload;
      break;
    case MINUS_ONE_FROM_CART:
      return action.payload;
      break;
    default:
      return state;
      break;
  }
};
