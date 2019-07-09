import {
  LOGIN_ADMIN,
  FETCH_ADMINS,
  UPDATE_ADMIN,
  CREATE_ADMIN,
} from '../actions/types';
import { createItems, updateItem, insertItem } from './utils';

const initialState = {
  currentAdmin: {},
  admins: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
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
    case CREATE_ADMIN:
      return {
        ...state,
        admins: insertItem(state.admins, action.payload, '_id'),
      };
    default:
      return state;
  }
}
