/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAuthHeader } from '../utils/token';
import { FETCH_MENU, ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from './types';

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

export const addMenuItem = postData => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:9000/menuitems/', postData, setAuthHeader());
    dispatch({
      type: ADD_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMenuItem = putData => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:9000/menuitems/${putData.menuNumber}`, putData, setAuthHeader());
    console.log(res.data)
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMenuItem = menuNumber => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:9000/menuItems/${menuNumber}`, setAuthHeader());
    dispatch({
      type: DELETE_MENU_ITEM,
      payload: { menuNumber },
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadMenuItemImage = (id, file) => async (dispatch) => {
  try {
    const fd = new FormData();
    fd.append('id', id);
    fd.append('image', file);
    const res = await axios.post('http://localhost:9000/menuitems/image/',
      fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    dispatch({
      type: UPDATE_MENU_ITEM,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
