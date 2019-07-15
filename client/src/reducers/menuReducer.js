import {
  ADD_MENU_ITEM, DELETE_MENU_ITEM, FETCH_MENU, UPDATE_MENU_ITEM,
} from '../actions/types';
import { createItems, insertItem, updateItem, deleteItem } from './utils/utils';

const initialState = {
  items: {},
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MENU:
      return {
        ...state,
        items: createItems(action.payload, 'menuNumber'),
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        items: insertItem(state.items, action.payload, 'menuNumber'),
      };
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        items: updateItem(state.items, action.payload, 'menuNumber'),
      };
    case DELETE_MENU_ITEM:
      return {
        ...state,
        items: deleteItem(state.items, action.payload, 'menuNumber'),
      };
    default:
      return state;
  }
}
