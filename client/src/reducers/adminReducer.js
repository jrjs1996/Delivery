import { LOGIN_ADMIN, FETCH_ADMINS } from '../actions/types';

const initialState = {
  currentAdmin: {},
  admins: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    case FETCH_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    default:
      return state;
  }
}
