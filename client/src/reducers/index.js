import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import adminReducer from './adminReducer';

export default combineReducers({
  customers: customerReducer,
  orders: orderReducer,
  admins: adminReducer,
});
