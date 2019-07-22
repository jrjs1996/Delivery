import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../actions/order/order';
import OrderList from '../../General/OrderList/OrderList';

function Orders({ fetchAction, orders }) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <OrderList
      orders={orders}
    />
  );
}

Orders.propTypes = {
  /** Action to fetch orders. */
  fetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(
  mapStateToProps,
  { fetchAction: fetchOrders },
)(Orders);
