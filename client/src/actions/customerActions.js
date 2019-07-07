import axios from 'axios';
import {
  FETCH_CUSTOMERS,
  GET_CUSTOMER,
  UPDATE_CUSTOMER,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
} from './types';
import { saveToken, setAuthHeader } from '../utils/token';

export const fetchCustomers = () => (dispatch) => {
  axios.get('/api/customers/', setAuthHeader()).then((res) => {
    dispatch({
      type: FETCH_CUSTOMERS,
      payload: res.data,
    });
  });
};

export const addCustomer = postData => (dispatch) => {
  axios.post('/api/customers/', postData).then((res) => {
    dispatch({
      type: ADD_CUSTOMER,
      payload: res.data,
    });
  });
};

export const signIn = postData => (dispatch) => {
  axios.post('/api/customers/signin/', postData).then((res) => {
    saveToken(res.data);
  });
};

export const getCustomer = userId => (dispatch) => {
  axios.get('/api/customers/info/', setAuthHeader()).then((res) => {
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  });
};

export const updateCustomer = putData => (dispatch) => {
  axios.put(`/api/customers/${putData._id}`, putData, setAuthHeader()).then(() => {
    const payload = putData;
    dispatch({
      type: UPDATE_CUSTOMER,
      payload,
    });
  });
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
