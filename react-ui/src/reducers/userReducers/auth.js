import {
  LOGIN_USER,
  GET_USER,
  SIGN_UP,
  LOGOUT_USER,
} from '../../actions/types';

const INITIAL_STATE = {
  user: null,
  token: null,
  auth: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        auth: true,
      };
      break;

    case GET_USER:
      return {
        ...state,
        user: action.payload.data,
        token: localStorage.getItem('token'),
        auth: true,
      };
      break;

    case SIGN_UP:
      return {
        ...state,
        user: action.payload.data,
        token: localStorage.getItem('token'),
        auth: true,
      };
      break;

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        token: null,
        auth: false,
      };
      break;

    default:
      break;
  }

  return state;
};
