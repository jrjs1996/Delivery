import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  FETCH_CUSTOMERS,
  UPDATE_CURRENT_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../../actions/types';
import {
  updateItem, deleteItem, insertItem, createItems,
} from '../utils/utils';

const initialState = {
  items: {},
  currentCustomer: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        items: insertItem(state.items, action.payload, '_id'),
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        items: deleteItem(state.items, action.payload, '_id'),
      };
    case FETCH_CUSTOMERS:
      return {
        ...state,
        items: createItems(action.payload, '_id'),
      };
    case UPDATE_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.payload,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        items: updateItem(state.items, action.payload, '_id'),
      };
    default:
      return state;
  }
}
