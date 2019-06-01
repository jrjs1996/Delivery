import axios from 'axios';
import { FETCH_CUSTOMERS, ADD_CUSTOMER } from './types';

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
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data,
      });
    });
};
