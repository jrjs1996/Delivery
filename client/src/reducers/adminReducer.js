import { LOGIN_ADMIN } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
