import {
  CREATE_ADMIN, FETCH_ADMINS, UPDATE_ADMIN, UPDATE_CURRENT_ADMIN, DELETE_CURRENT_ADMIN,
} from '../../actions/types';
import { createItems, updateItem, insertItem } from '../utils/utils';

const initialState = {
  admins: {},
  currentAdmin: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ADMIN:
      return {
        ...state,
        admins: insertItem(state.admins, action.payload, '_id'),
      };
    case DELETE_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: {},
      };
    case FETCH_ADMINS:
      return {
        ...state,
        admins: createItems(action.payload, '_id'),
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: updateItem(state.admins, action.payload, '_id'),
      };
    case UPDATE_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    default:
      return state;
  }
}
