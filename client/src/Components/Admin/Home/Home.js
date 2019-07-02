import { connect } from 'react-redux';
import PropType from 'prop-types';
import React, { useEffect } from 'react';

import { fetchOpenOrders, updateOrder } from '../../../actions/orderActions';
import { menuItemPropType } from '../../../propTypes';

import './Home.css';
import Order from './Order/Order';


const getDate = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: 'numeric' });
};

function Home({
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

Home.propTypes = {
  fetchAction: PropType.func.isRequired,
  orders: PropType.arrayOf(menuItemPropType).isRequired,
  updateAction: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, {
  fetchAction: fetchOpenOrders,
  updateAction: updateOrder,
})(Home);
