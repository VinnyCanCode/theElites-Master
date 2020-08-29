import {
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  LOGOUT_USER,
} from '../../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_WISHLIST:
      return action.payload;
      break;
    case ADD_TO_WISHLIST:
      return action.payload;
      break;
    case DELETE_FROM_WISHLIST:
      return action.payload;
      break;
    case LOGOUT_USER:
      return [];
      break;
    default:
      break;
  }

  return state;
};
