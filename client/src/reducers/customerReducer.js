import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  GET_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../actions/types';
import { updateItem, deleteItem, insertItem, createItems } from './utils';

const initialState = {
  items: {},
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        items: createItems(action.payload, '_id'),
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        items: insertItem(state.items, action.payload, '_id'),
      };
    case GET_CUSTOMER:
      return {
        ...state,
        item: action.payload,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        items: updateItem(state.items, action.payload, '_id'),
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        items: deleteItem(state.items, action.payload, '_id'),
      };
    default:
      return state;
  }
}
