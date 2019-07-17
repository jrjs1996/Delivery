import { FETCH_ORDERS, ADD_ORDER, UPDATE_ORDER } from '../../actions/types';
import { createItems, insertItem, updateItem } from '../utils/utils';

const initialState = {
  items: {},
  currentOrder: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        items: insertItem(state.items, action.payload, '_id'),
      };
    case FETCH_ORDERS:
      return {
        ...state,
        items: createItems(action.payload, '_id'),
      };

    case UPDATE_ORDER:
      return {
        ...state,
        items: updateItem(state.items, action.payload, '_id'),
      };
    default:
      return state;
  }
}
