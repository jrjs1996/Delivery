import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Order from './Order';
import { fetchOpenOrders } from '../../../actions/orderActions';
import './Home.css';
import { menuItemPropType } from '../../../propTypes';

const getDate = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: 'numeric' });
};

function Home({ fetchAction, orders }) {
  useEffect(fetchAction, [fetchAction]);

  return (
    <div>
      {orders.map(o => (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          orderCreated={getDate(o.orderCreated)}
          stage={o.stage}
          id={o._id}
          key={o._id}
          items={o.items}
        />
      ))}
    </div>
  );
}

Home.propTypes = {
  fetchAction: PropType.func.isRequired,
  orders: PropType.arrayOf(menuItemPropType).isRequired,
};

const mapStateToProps = state => ({
  orders: state.orders.items,
});

export default connect(mapStateToProps, { fetchAction: fetchOpenOrders })(Home);
