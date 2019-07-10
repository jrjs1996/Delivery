import axios from 'axios';
import {
  FETCH_CUSTOMERS,
  GET_CUSTOMER,
  UPDATE_CUSTOMER,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  ERROR,
} from './types';
import { saveToken, setAuthHeader } from '../utils/token';

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

export const signIn = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/customers/signin/', postData);
    saveToken(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCustomer = userId => (dispatch) => {
  axios.get('/api/customers/info/', setAuthHeader()).then((res) => {
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  });
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
      payload: 'Unable to update customer.',
    });
    throw error;
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
    console.log(error);
  }
};
