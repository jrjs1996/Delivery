import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { OrderPropType } from '../../../propTypes';
import Order from './Order/Order';

const getDate = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-CA', { hour: 'numeric', minute: 'numeric' });
};

export default function OrderList({ orders, updateAction, ...rest }) {
  return (
    <div {...rest}>
      {Object.entries(orders).map(([, o]) => (
        <Order
          address={o.address}
          customerName={o.customerName}
          delivery={o.delivery}
          id={o._id}
          items={o.items}
          key={shortid.generate()}
          orderCreated={getDate(o.orderCreated)}
          stage={o.stage}
          updateAction={updateAction}
        />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  /** Orders to populate the list with. */
  orders: PropTypes.arrayOf(OrderPropType).isRequired,
  /** Action to update an order. */
  updateAction: PropTypes.func,
};

OrderList.defaultProps = {
  updateAction: null,
};
