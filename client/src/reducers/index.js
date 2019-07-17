import { combineReducers } from 'redux';

import adminReducer from './admin/admin';
import customerReducer from './customer/customer';
import errorReducer from './error/error';
import menuReducer from './menu/menu';
import orderReducer from './order/order';

export default combineReducers({
  admins: adminReducer,
  customers: customerReducer,
  error: errorReducer,
  menu: menuReducer,
  orders: orderReducer,
});
