import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  createOrder,
  addToCurrentOrder,
  removeFromCurrentOrder,
} from '../../../actions/order/order';
import MenuItemList from '../../General/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menu/menu';
import SettingPage from '../../General/SettingPage/SettingPage';
import SettingPageInput from '../../General/SettingPage/SettingPageInput/SettingPageInput';
import SettingPageCheckBox from '../../General/SettingPage/SettingPageCheckBox/SettingPageCheckBox';
import SettingPageSelect from '../../General/SettingPage/SettingPageSelect/SettingPageSelect';
import OrderItemList from './OrderItemList/OrderItemList';
import './CreateOrder.css';

const getOptions = (state) => {
  const options = [[0, 'Submitted'], [1, 'Preparing'], [4, 'Completed'], [5, 'Cancelled']];
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
  addAction,
  createAction,
  currentOrder,
  removeAction,
  fetchAction,
  menu,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <div>
      <Paper className="CreateOrder">
        <SettingPage
          className="CreateOrderForm"
          clearOnSubmit
          title="Create Order"
          onSubmit={(formData) => {
            createAction(currentOrder, formData);
            return 'ok';
          }}
          onValueChange={manageState}
        >
          <SettingPageInput required fullWidth name="customerName" label="Customer Name" />
          <SettingPageInput required fullWidth name="address" label="Address" />
          <SettingPageSelect name="stage" value={1} getOptions={getOptions} />
          <SettingPageCheckBox label="Delivery" name="delivery" value />
        </SettingPage>
        <Paper>
          <Paper>
            <Typography variant="h3">{`$${currentOrder.total}`}</Typography>
            <br />
          </Paper>
          <OrderItemList order={currentOrder} onClick={removeAction} />
        </Paper>
      </Paper>
      <MenuItemList menu={menu} onSelect={i => addAction(menu[i])} />
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
  currentOrder: state.orders.currentOrder,
});

export default connect(
  mapStateToProps,
  {
    addAction: addToCurrentOrder,
    createAction: createOrder,
    removeAction: removeFromCurrentOrder,
    fetchAction: fetchMenu,
  },
)(CreateOrderComponent);
