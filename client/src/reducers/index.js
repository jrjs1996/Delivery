import { combineReducers } from 'redux';

import adminReducer from './admin/admin';
import customerReducer from './customer/customer';
import errorReducer from './errorReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  admins: adminReducer,
  customers: customerReducer,
  error: errorReducer,
  menu: menuReducer,
  orders: orderReducer,
});
