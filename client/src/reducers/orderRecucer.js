import { FETCH_ORDERS, ADD_CUSTOMER } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    default:
      return state;
  }
}
