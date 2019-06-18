import { FETCH_CUSTOMERS, ADD_CUSTOMER, GET_CUSTOMER } from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case GET_CUSTOMER:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
