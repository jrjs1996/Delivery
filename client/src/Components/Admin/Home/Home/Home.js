import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import shortid from 'shortid';

import { fetchOpenOrders, updateOrder } from '../../../../actions/order/order';
import { OrderPropType } from '../../../../propTypes';

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

  useEffect(() => {fetchAction();}, [fetchAction]);
  return (
    <div className="Orders">
      {Object.entries(orders).map(([, o]) => (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          id={shortid.generate()}
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
