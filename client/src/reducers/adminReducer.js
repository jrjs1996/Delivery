import {
  LOGIN_ADMIN,
  FETCH_ADMINS,
  UPDATE_ADMIN,
  CREATE_ADMIN,
} from '../actions/types';
import { updateItem } from './utils';

const initialState = {
  currentAdmin: {},
  admins: [],
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
        admins: action.payload,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: updateItem(state.admins, action.payload, '_id'),
      };
    case CREATE_ADMIN:
      console.log(action.payload);
      return {
        ...state,
        admins: [action.payload, ...state.admins],
      };
    default:
      return state;
  }
}
