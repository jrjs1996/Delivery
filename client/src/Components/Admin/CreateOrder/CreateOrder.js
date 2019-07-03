import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../../actions/orderActions';
import MenuItemList from '../Menu/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menuActions';
import SettingPage from '../Settings/SettingPage/SettingPage';
import SettingPageInput from '../Settings/SettingPage/SettingPageInput/SettingPageInput';
import SettingPageCheckBox from '../Settings/SettingPage/SettingPageCheckBox/SettingPageCheckBox';
import SettingPageSelect from '../Settings/SettingPage/SettingPageSelect/SettingPageSelect';
import OrderItemList from './OrderItemList/OrderItemList';
import './CreateOrder.css';

const onSubmit = (formData, items, createAction) => {
  const order = formData;
  order.items = items.map(i => i._id);
  createAction(order);
};

const addItem = (item, menu, items, setItems, total, setTotal) => {
  const newItem = menu[item];
  const newItems = items.slice();
  newItems.push(newItem);
  const newTotal = total + newItem.price;
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
  const newState = state;
  if (state.delivery === false && state.stage === 3) {
    newState.stage = 2;
  }
  return state;
};

export function CreateOrderComponent({
  createAction,
  fetchAction,
  menu,
}) {
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(fetchAction, [fetchAction]);

  return (
    <div>
      <Paper className="CreateOrderForm">
        <SettingPage
          title="Create Order"
          onSubmit={formData => onSubmit(formData, orderItems, createAction)}
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
        <Paper>
          <Paper>
            <Typography variant="h3">{`$${total}`}</Typography>
            <br />
          </Paper>
          <OrderItemList
            orderItems={orderItems}
            onClick={index => removeItem(index, orderItems, setOrderItems, total, setTotal)}
          />
        </Paper>
      </Paper>
      <MenuItemList
        menu={menu}
        onSelect={i => addItem(i, menu, orderItems, setOrderItems, total, setTotal)}
      />
    </div>
  );
}

CreateOrderComponent.propTypes = {
  createAction: PropTypes.func.isRequired,
  fetchAction: PropTypes.func.isRequired,
  menu: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, {
  createAction: createOrder,
  fetchAction: fetchMenu,
})(CreateOrderComponent);
