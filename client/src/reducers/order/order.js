import {
  FETCH_ORDERS,
  ADD_ORDER,
  UPDATE_ORDER,
  ADD_TO_CURRENT_ORDER,
  REMOVE_FROM_CURRENT_ORDER,
  DELETE_CURRENT_ORDER,
} from '../../actions/types';
import { createItems, insertItem, updateItem } from '../utils/utils';

const initialState = {
  items: {},
  currentOrder: {},
};

const addToCurrentOrder = (currentOrder, item) => {
  const newOrder = { ...currentOrder };
  // If the item is already in the order add 1 to count
  if (newOrder[item.menuNumber]) {
    newOrder[item.menuNumber].count += 1;
    return newOrder;
  }
  // Otherwise add it to the order
  newOrder[item.menuNumber] = {
    item,
    count: 1,
  };
  return newOrder;
};

const removeFromCurrentOrder = (currentOrder, menuNumber) => {
  const newOrder = { ...currentOrder };
  if (!newOrder[menuNumber]) return newOrder;

  newOrder[menuNumber].count -= 1;
  // If count is less than 1 remove it from the order
  if (newOrder[menuNumber].count < 1) {
    delete newOrder[menuNumber];
  }
  return newOrder;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        items: insertItem(state.items, action.payload, '_id'),
      };
    case ADD_TO_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: addToCurrentOrder(state.currentOrder, action.payload),
      };
    case DELETE_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: {},
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
    case REMOVE_FROM_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: removeFromCurrentOrder(state.currentOrder, action.payload),
      };
    default:
      return state;
  }
}
