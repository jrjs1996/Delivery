import axios from 'axios';
import {
  ADD_ORDER, FETCH_ORDERS, UPDATE_ORDER, ERROR,
} from '../types';
import { setAuthHeader } from '../../utils/token';

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

export const updateOrder = (id, putData) => async (dispatch) => {
  try {
    await axios.put(`/api/orders/${id}`, putData, setAuthHeader());
    const payload = putData;
    payload._id = id;
    dispatch({
      type: UPDATE_ORDER,
      payload,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to update order.',
    });
  }
};
