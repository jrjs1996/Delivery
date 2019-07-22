import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { fetchOpenOrders, updateOrder } from '../../../../actions/order/order';
import { OrderPropType } from '../../../../propTypes';

import './Home.css';
import OrderList from '../../../General/OrderList/OrderList';

export function HomeComponent({
  fetchAction,
  orders,
  updateAction,
}) {
  useEffect(() => { fetchAction(); }, [fetchAction]);
  return (
    <OrderList
      orders={orders}
      updateAction={updateAction}
    />
  );
}

HomeComponent.propTypes = {
  /** Function that is called when the component loads. Fetches
   * the orders. */
  fetchAction: PropTypes.func.isRequired,
  /** The orders to populate the page with. */
  orders: PropTypes.arrayOf(OrderPropType).isRequired,
  /** Action that updates an order. */
  updateAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, {
  fetchAction: fetchOpenOrders,
  updateAction: updateOrder,
})(HomeComponent);
