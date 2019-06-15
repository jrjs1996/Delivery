/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { FETCH_MENU } from './types';

export const fetchMenu = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:9000/menuitems/');
    dispatch({
      type: FETCH_MENU,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
