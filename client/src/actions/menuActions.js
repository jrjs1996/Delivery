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
      payload: menuNumber,
    });
  } catch (error) {
    console.log(error);
  }
};
