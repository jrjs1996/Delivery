import React, { Component, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { createOrder } from '../../../actions/orderActions';
import MenuItemList from '../Menu/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menuActions';
import OrderItem from './OrderItem';
import SettingPage from '../Settings/SettingPage/SettingPage';
import SettingPageInput from '../Settings/SettingPage/SettingPageInput/SettingPageInput';
import SettingPageCheckBox from '../Settings/SettingPage/SettingPageCheckBox/SettingPageCheckBox';
import SettingPageSelect from '../Settings/SettingPage/SettingPageSelect/SettingPageSelect';

const onDeliveryChange = (delivery, setDelivery, stage, setStage) => {
  if (delivery === true && stage === 3) {
    setStage(2);
  }
  setDelivery(!delivery);
};

const onSubmit = (customerName,
  address,
  delivery,
  stage,
  items,
  total,
  createOrder) => {
  const orderItems = items.map(i => i._id);
  createOrder({ customerName, address, delivery, stage, items: orderItems, total });
  this.setState({
    message: 'Order Created!',
    customerName: '',
    address: '',
    delivery: true,
    stage: 1,
  });
};

const addItem = (item, menu, items, setItems, total, setTotal) => {
  item = menu[item]
  const newItems = items.slice();
  newItems.push(item);
  const newTotal = total + item.price;
  setItems(newItems);
  setTotal(newTotal);
};

const removeItem = (index, items, setItems, total, setTotal) => {
  const newItems = items.slice();
  const newTotal = total - items[index].price;
  newItems.splice(index, 1);
  setItems(newItems);
  setTotal(newTotal);
};

const getOptions = (state) => {
  const options = [
    [0, 'Submitted'],
    [1, 'Preparing'],
    [4, 'Completed'],
    [5, 'Cancelled'],
  ];
  if (state.delivery) {
    options.splice(2, 0, [2, 'Waiting for delivery']);
    options.splice(3, 0, [3, 'Out for delivery']);
  } else {
    options.splice(2, 0, [2, 'Waiting for pickup']);
  }
  return options;
};

const manageState = (state) => {

};

function CreateOrderForm({
  fetchMenu,
}) {
  const [delivery, setDelivery] = useState(true);

  useEffect(fetchMenu, [fetchMenu])

  return (
    <div>
      <SettingPage
        title="Create Order"
        onSubmit={console.log}
        onValueChange={manageState}
      >
        <SettingPageInput required fullWidth name="customerName" label="Customer Name" />
        <SettingPageInput required fullWidth name="address" label="Address" />
        <SettingPageSelect
          name="stage"
          value={1}
          getOptions={getOptions}
        />
        <SettingPageCheckBox label="Delivery" name="delivery" value />
      </SettingPage>
    </div>
  );
}

CreateOrderForm.propTypes = {
  createOrder: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { createOrder, fetchMenu })(CreateOrderForm);
