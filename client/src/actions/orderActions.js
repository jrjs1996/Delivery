import axios from 'axios';
import { ADD_ORDER, FETCH_ORDERS } from './types';

export const fetchOrders = () => (dispatch) => {
  axios.get('http://localhost:9000/orders/')
    .then((res) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    });
};

export const addOrder = postData => (dispatch) => {
  axios.post('http://localhost:9000/orders/', postData)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    });
};
