import {
  FETCH_MENU,
  ADD_MENU_ITEM,
  UPDATE_MENU_ITEM,
  DELETE_MENU_ITEM,
} from '../actions/types';
import { insertItem, deleteItem } from './utils';

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MENU:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_MENU_ITEM:
      return {
        ...state,
        items: insertItem(state.items, action.payload, 'menuNumber'),
      };
    case UPDATE_MENU_ITEM:
      return {
        ...state,
        items: state.items.map((i) => {
          if (i.menuNumber !== action.payload.menuNumber) return i;
          return action.payload;
        }),
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
