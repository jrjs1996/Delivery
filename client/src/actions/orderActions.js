import axios from 'axios';
import { ADD_ORDER, FETCH_ORDERS, COMPLETE_ORDER } from './types';
import { setAuthHeader } from '../utils/token';

export const fetchOrders = () => (dispatch) => {
  axios.get('/orders/')
    .then((res) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    });
};

export const fetchOpenOrders = () => (dispatch) => {
  axios.get('/orders/?toStage=3')
    .then((res) => {
      dispatch({
        type: FETCH_ORDERS,
        payload: res.data,
      });
    });
};

export const createOrder = postData => (dispatch) => {
  axios.post('/orders/', postData)
    .then((res) => {
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    });
};

export const updateOrder = (id, putData) => (dispatch) => {
  axios.put(`/orders/${id}`, putData, setAuthHeader())
    .then(() => {
      const payload = putData;
      payload._id = id;
      dispatch({
        type: COMPLETE_ORDER,
        payload,
      });
    });
};
