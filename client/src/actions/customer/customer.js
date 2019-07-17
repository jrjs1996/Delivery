import axios from 'axios';
import {
  ADD_CUSTOMER,
  DELETE_CURRENT_CUSTOMER,
  DELETE_CUSTOMER,
  ERROR,
  FETCH_CUSTOMERS,
  UPDATE_CURRENT_CUSTOMER,
  UPDATE_CUSTOMER,
} from '../types';
import { saveToken, setAuthHeader, removeToken } from '../../utils/token';

export const addCustomer = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/customers/', postData);
    dispatch({
      type: ADD_CUSTOMER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to add customer',
    });
  }
};

export const deleteCustomer = customerId => async (dispatch) => {
  try {
    await axios.delete(`/api/customers/${customerId}`, setAuthHeader());
    dispatch({
      type: DELETE_CUSTOMER,
      payload: { _id: customerId },
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to delete customer',
    });
  }
};

export const fetchCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/customers/', setAuthHeader());
    dispatch({
      type: FETCH_CUSTOMERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to fetch customers.',
    });
  }
};

export const getCurrentCustomerInfo = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/customers/login/', setAuthHeader());
    dispatch({
      type: UPDATE_CURRENT_CUSTOMER,
      payload: res.data,
    });
  } catch (error) {
    if (error.response.status === 401) {
      console.log('h1h1');
      removeToken();
      return;
    }
    console.log('h1h1');
    throw error;
  }
};

export const getCustomer = userId => (dispatch) => {
  axios.get('/api/customers/info/', setAuthHeader()).then((res) => {
    dispatch({
      type: UPDATE_CURRENT_CUSTOMER,
      payload: res.data,
    });
  });
};

export const login = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/customers/login/', postData);
    saveToken(res.data.token, false);
    dispatch({
      type: UPDATE_CURRENT_CUSTOMER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.toString(),
    });
  }
};

export const logout = () => (dispatch) => {
  try {
    removeToken();
    dispatch({
      type: DELETE_CURRENT_CUSTOMER,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to log out.',
    });
  }
};

export const updateCustomer = putData => async (dispatch) => {
  try {
    await axios.put(`/api/customers/${putData._id}`, putData, setAuthHeader());
    const payload = putData;
    dispatch({
      type: UPDATE_CUSTOMER,
      payload,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to update customer',
    });
  }
};
