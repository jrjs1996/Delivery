import axios from 'axios';
import { FETCH_CUSTOMERS, ADD_CUSTOMER, GET_CUSTOMER } from './types';
import { saveToken, setAuthHeader } from '../utils/token';

export const fetchCustomers = () => (dispatch) => {
  axios.get('http://localhost:9000/customers/')
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
      saveToken(res.data);
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
