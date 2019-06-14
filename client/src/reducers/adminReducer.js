import { LOGIN_ADMIN } from '../actions/types';

const initialState = {
  currentAdmin: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    default:
      return state;
  }
}
