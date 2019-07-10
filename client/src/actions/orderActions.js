import axios from 'axios';
import {
  ADD_ORDER, FETCH_ORDERS, COMPLETE_ORDER, ERROR,
} from './types';
import { setAuthHeader } from '../utils/token';

export const fetchOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/');
    dispatch({
      type: FETCH_ORDERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to fetch orders',
    });
  }
};

export const fetchOpenOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/?toStage=3');
    dispatch({
      type: FETCH_ORDERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to fetch orders',
    });
  }
};

export const createOrder = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/orders/', postData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to create order',
    });
  }
};

export const updateOrder = (id, putData) => (dispatch) => {
  axios.put(`/api/orders/${id}`, putData, setAuthHeader()).then(() => {
    const payload = putData;
    payload._id = id;
    dispatch({
      type: COMPLETE_ORDER,
      payload,
    });
  });
};
