import axios from 'axios';
import { FETCH_CUSTOMERS, GET_CUSTOMER, UPDATE_CUSTOMER, ADD_CUSTOMER, DELETE_CUSTOMER } from './types';
import { saveToken, setAuthHeader } from '../utils/token';

export const fetchCustomers = () => (dispatch) => {
  axios.get('http://localhost:9000/customers/', setAuthHeader())
    .then((res) => {
      dispatch({
        type: FETCH_CUSTOMERS,
        payload: res.data,
      });
    });
};

export const addCustomer = postData => (dispatch) => {
  axios.post('http://localhost:9000/customers/', postData)
    .then((res) => {
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data,
      });
    });
};

export const signIn = postData => (dispatch) => {
  axios.post('http://localhost:9000/customers/signin/', postData)
    .then((res) => {
      saveToken(res.data);
    });
};

export const getCustomer = userId => (dispatch) => {
  axios.get(`http://localhost:9000/customers/info/`, setAuthHeader())
    .then((res) => {
      dispatch({
        type: GET_CUSTOMER,
        payload: res.data,
      });
    });
};

export const updateCustomer = putData => (dispatch) => {
  axios.put(`http://localhost:9000/customers/${putData._id}`, putData, setAuthHeader())
    .then(() => {
      const payload = putData;
      dispatch({
        type: UPDATE_CUSTOMER,
        payload,
      });
    });
};

export const deleteCustomer = customerId => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:9000/customers/${customerId}`, setAuthHeader());
    dispatch({
      type: DELETE_CUSTOMER,
      payload: { _id: customerId },
    });
  } catch (error) {
    console.log(error);
  }
};
