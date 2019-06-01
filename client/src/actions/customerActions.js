import axios from 'axios';
import { FETCH_CUSTOMERS } from './types';

export const fetchCustomers = () => (dispatch) => {
  console.log('feteching customers');
  axios.get('http://localhost:9000/testAPI')
    .then((res) => {
      dispatch({
        type: FETCH_CUSTOMERS,
        payload: res.data
      })
  });
}