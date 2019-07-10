/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAuthHeader } from '../utils/token';
import {
  FETCH_MENU, ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM, ERROR,
} from './types';

export const fetchMenu = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/menuitems/');
    dispatch({
      type: FETCH_MENU,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to fetch menu',
    });
  }
};

export const addMenuItem = postData => async (dispatch) => {
  try {
    const res = await axios.post('/api/menuitems/', postData, setAuthHeader());
    dispatch({
      type: ADD_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to add menu item',
    });
  }
};

export const updateMenuItem = putData => async (dispatch) => {
  try {
    const res = await axios.put(`/api/menuitems/${putData.menuNumber}`, putData, setAuthHeader());
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to update menu item',
    });
  }
};

export const deleteMenuItem = menuNumber => async (dispatch) => {
  try {
    await axios.delete(`/api/menuItems/${menuNumber}`, setAuthHeader());
    dispatch({
      type: DELETE_MENU_ITEM,
      payload: { menuNumber },
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to delete menu item',
    });
  }
};

export const uploadMenuItemImage = (id, file) => async (dispatch) => {
  try {
    const fd = new FormData();
    fd.append('id', id);
    fd.append('image', file);
    const res = await axios.post('/api/menuitems/image/', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Unable to update menu item image.',
    });
  }
};
