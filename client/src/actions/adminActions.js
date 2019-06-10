/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { saveToken } from '../utils/token';
import { LOGIN_ADMIN } from './types';

export const login = postData => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:9000/admins/login/', postData);
    saveToken(res.data, true);
    dispatch({
      type: LOGIN_ADMIN,
      payload: {
        username: postData.username,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};
