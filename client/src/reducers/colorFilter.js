import { COLOR_FILTER } from '../actions/types';

export default (state = [], action) => {
  if (action.type === COLOR_FILTER) {
    // If action.payload is clear, clear colorFilter's state
    if (action.payload === 'clear') {
      return [];
    }

    // If color is already in state, remove item from state and return state
    if (state.includes(action.payload)) {
      return state.filter((item) => item !== action.payload);
    }

    // If color is not already in state, add to state
    return [...state, action.payload];
  }

  return state;
};
