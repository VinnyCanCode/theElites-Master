import { SORT_SELECTION } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SORT_SELECTION) {
    return action.payload;
  } else {
    return state;
  }
};
