import { FETCH_ORDERS, ADD_ORDER, UPDATE_ORDER, ADD_TO_CURRENT_ORDER } from '../../actions/types';
import { createItems, insertItem, updateItem } from '../utils/utils';

const initialState = {
  items: {},
  currentOrder: {},
};

const addToCurrentOrder = (currentOrder, item) => {
  const newOrder = { ...currentOrder };
  if (newOrder[item._id]) {
    newOrder[item._id].count += 1;
    return newOrder;
  }
  newOrder[item._id] = {
    item,
    count: 1,
  };
  return newOrder;
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
    case ADD_TO_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: addToCurrentOrder(state.currentOrder, action.payload),
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
