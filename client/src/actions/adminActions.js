import axios from 'axios';
import { saveToken, removeToken, setAuthHeader } from '../utils/token';
import {
  UPDATE_CURRENT_ADMIN, FETCH_ADMINS, UPDATE_ADMIN, CREATE_ADMIN,
} from './types';

export const login = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/admins/login/', postData);
    saveToken(res.data, true);
    dispatch({
      type: UPDATE_CURRENT_ADMIN,
      payload: {
        username: postData.username,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateCurrentAdmin = putData => async (dispatch) => {
  try {
    const res = await axios.put(`/api/admins/${putData._id}`, putData, setAuthHeader());
    dispatch({
      type: UPDATE_CURRENT_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAdmin = putData => (dispatch) => {
  axios.put(`/api/admins/${putData._id}`, putData, setAuthHeader()).then(() => {
    const payload = putData;
    dispatch({
      type: UPDATE_ADMIN,
      payload,
    });
  });
};

export const getCurrentAdminInfo = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admins/login/', setAuthHeader());
    dispatch({
      type: UPDATE_CURRENT_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAdmins = () => async (dispatch) => {
  const res = await axios.get('/api/admins/', setAuthHeader());
  try {
    dispatch({
      type: FETCH_ADMINS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createAdmin = postData => async (dispatch) => {
  const res = await axios.post('/api/admins/', postData, setAuthHeader());
  console.log(res);
  try {
    dispatch({
      type: CREATE_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => () => {
  removeToken();
};
