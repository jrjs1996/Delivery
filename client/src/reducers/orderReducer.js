import { FETCH_ORDERS, ADD_ORDER, COMPLETE_ORDER } from '../actions/types';

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
    case ADD_ORDER:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case COMPLETE_ORDER:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) return Object.assign(item, action.payload);
          return item;
        }),
      };
    default:
      return state;
  }
}
