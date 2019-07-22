import axios from 'axios';
import {
  ADD_ORDER,
  ADD_TO_CURRENT_ORDER,
  DELETE_CURRENT_ORDER,
  ERROR,
  FETCH_ORDERS,
  REMOVE_FROM_CURRENT_ORDER,
  UPDATE_ORDER,
} from '../types';
import { setAuthHeader } from '../../utils/token';

export const addToCurrentOrder = item => (dispatch) => {
  dispatch({
    type: ADD_TO_CURRENT_ORDER,
    payload: item,
  });
};

export const createOrder = (currentOrder, orderInfo = {}) => async (dispatch) => {
  try {
    const postData = Object.assign(orderInfo);
    postData.items = {};
    Object.keys(currentOrder.items).forEach((i) => {
      postData.items[i] = currentOrder.items[i].count;
    });
    const res = await axios.post('/api/orders/', postData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: 'Unable to create order',
    });
  }
};

export const deleteCurrentOrder = () => (dispatch) => {
  dispatch({
    type: DELETE_CURRENT_ORDER,
  });
};

export const fetchOpenOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/orders/?toStage=3', setAuthHeader());
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
    const res = await axios.get('/api/orders/', setAuthHeader());
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

export const removeFromCurrentOrder = menuNumber => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CURRENT_ORDER,
    payload: menuNumber,
  });
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
