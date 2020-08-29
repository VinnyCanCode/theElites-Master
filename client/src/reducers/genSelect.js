import { GEN_SELECT } from '../actions/types';

export default (state = '', action) => {
  if (action.type === GEN_SELECT) {
    return action.payload;
  } else {
    return state;
  }
};
