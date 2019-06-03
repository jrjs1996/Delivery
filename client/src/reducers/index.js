import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import orderReducer from './orderRecucer';

export default combineReducers({
  customers: customerReducer,
  orders: orderReducer,
});
