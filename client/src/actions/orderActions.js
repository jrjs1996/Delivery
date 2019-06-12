import axios from 'axios';
import { ADD_ORDER, FETCH_ORDERS, COMPLETE_ORDER } from './types';

export const fetchOrders = () => (dispatch) => {
  axios.get('http://localhost:9000/orders/')
    .then((res) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    });
};

export const createOrder = postData => (dispatch) => {
  axios.post('http://localhost:9000/orders/', postData)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    });
};

export const completeOrder = putData => (dispatch) => {
  axios.put(`http://localhost:9000/orders/${putData}`)
    .then((res) => {
      dispatch({
        type: COMPLETE_ORDER,
        payload: res.data,
      });
    });
};
