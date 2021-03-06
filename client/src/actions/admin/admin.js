import axios from 'axios';
import { saveToken, removeToken, setAuthHeader, getToken } from '../../utils/token';
import {
  UPDATE_CURRENT_ADMIN,
  FETCH_ADMINS,
  UPDATE_ADMIN,
  CREATE_ADMIN,
  ERROR,
  DELETE_CURRENT_ADMIN,
} from '../types';

export const createAdmin = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/admins/', postData, setAuthHeader());
    dispatch({
      type: CREATE_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to add admin',
    });
  }
};

export const fetchAdmins = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admins/', setAuthHeader());
    dispatch({
      type: FETCH_ADMINS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to fetch admins',
    });
  }
};

export const getCurrentAdminInfo = () => async (dispatch) => {
  try {
    if(!getToken()) return; 
    const res = await axios.get('/api/admins/login/', setAuthHeader());
    dispatch({
      type: UPDATE_CURRENT_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    if (error.response.status === 401) {
      removeToken();
      return;
    }
    dispatch({
      type: ERROR,
      payload: 'Unable to get current admin info.',
    });
  }
};

export const login = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/admins/login/', postData);
    saveToken(res.data.token, true);
    dispatch({
      type: UPDATE_CURRENT_ADMIN,
      payload: res.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to log in',
    });
    return false;
  }
};

export const logout = () => (dispatch) => {
  try {
    removeToken();
    dispatch({
      type: DELETE_CURRENT_ADMIN,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to log out.',
    });
  }
};

export const updateAdmin = putData => async (dispatch) => {
  try {
    await axios.put(`/api/admins/${putData._id}`, putData, setAuthHeader());
    const payload = putData;
    dispatch({
      type: UPDATE_ADMIN,
      payload,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to update admin.',
    });
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
    dispatch({
      type: ERROR,
      payload: 'Unable to update current admin.',
    });
  }
};
