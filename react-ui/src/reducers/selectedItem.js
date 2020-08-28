import { SELECTED_ITEM } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SELECTED_ITEM) {
    return action.payload;
  } else {
    return state;
  }
};
