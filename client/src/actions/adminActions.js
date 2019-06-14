import axios from 'axios';
import { saveToken, removeToken, setAuthHeader } from '../utils/token';
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

export const changeCurrentAdminUsername = (id, newUsername) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:9000/admins/${id}`,
      { username: newUsername }, setAuthHeader());
    dispatch({
      type: LOGIN_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentAdminInfo = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:9000/admins/login/', setAuthHeader());
    dispatch({
      type: LOGIN_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => () => {
  removeToken();
};
