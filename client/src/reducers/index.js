import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  customers: customerReducer,
  orders: orderReducer,
});
