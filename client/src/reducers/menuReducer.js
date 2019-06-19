import {
  FETCH_MENU,
  ADD_MENU_ITEM,
  UPDATE_MENU_ITEM,
  DELETE_MENU_ITEM,
} from '../actions/types';

const initialState = {
  items: [],
  item: {},
};

// TODO: Should I use a binary search for this?
// TODO: Should a make items a dictionary?

const insertMenuItem = (items, newItem) => {
  const newItems = items.slice();
  if (newItems.length === 0) return [newItem];

  for (let i = 0; i < newItems.length; i += 1) {
    if (newItems[i].menuNumber > newItem.menuNumber) {
      newItems.splice(i, 0, newItem);
      return newItems;
    }
  }
  newItems.push(newItem);
  return newItems;
};

const removeMenuItem = (items, itemNumber) => {
  const newItems = items.slice();

  for (let i = 0; i < newItems.length; i += 1) {
    if (newItems[i].menuNumber === itemNumber) {
      newItems.splice(i, 1);
      return newItems;
    }
  }
  return newItems;
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
        items: insertMenuItem(state.items, action.payload),
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
        items: removeMenuItem(state.items, action.payload),
      };
    default:
      return state;
  }
}
