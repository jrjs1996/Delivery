import { FETCH_ORDERS, ADD_ORDER, COMPLETE_ORDER } from '../actions/types';
import { createItems, insertItem, updateItem } from './utils';

const initialState = {
  items: {},
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        items: createItems(action.payload, '_id'),
      };
    case ADD_ORDER:
      return {
        ...state,
        items: insertItem(state.items, action.payload, '_id'),
      };
    case COMPLETE_ORDER:
      console.log(action.payload);
      return {
        ...state,
        items: updateItem(state.items, action.payload, '_id'),
      };
    default:
      return state;
  }
}
