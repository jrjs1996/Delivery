import { connect } from 'react-redux';
import PropType from 'prop-types';
import React, { useEffect } from 'react';

import { fetchOpenOrders, updateOrder } from '../../../../actions/orderActions';
import { orderPropType } from '../../../../propTypes';

import './Home.css';
import Order from '../Order/Order';


const getDate = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: 'numeric' });
};

export function HomeComponent({
  fetchAction,
  orders,
  updateAction,
}) {
  useEffect(fetchAction, [fetchAction]);

  return (
    <div>
      {orders.map(o => (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          id={o._id}
          items={o.items}
          key={o._id}
          orderCreated={getDate(o.orderCreated)}
          stage={o.stage}
          updateAction={updateAction}
        />
      ))}
    </div>
  );
}

HomeComponent.propTypes = {
  /** Function that is called when the component loads. Fetches
   * the orders. */
  fetchAction: PropType.func.isRequired,
  /** The orders to populate the page with. */
  orders: PropType.arrayOf(orderPropType).isRequired,
  /** Action that updates an order. */
  updateAction: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, {
  fetchAction: fetchOpenOrders,
  updateAction: updateOrder,
})(HomeComponent);
