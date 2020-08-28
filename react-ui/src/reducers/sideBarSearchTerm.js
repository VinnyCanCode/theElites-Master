import { SIDEBAR_SEARCH_TERM } from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case SIDEBAR_SEARCH_TERM:
      return action.payload;
    default:
      return state;
  }
};
