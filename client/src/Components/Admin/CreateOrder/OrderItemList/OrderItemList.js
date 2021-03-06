import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';
import { Grid } from '@material-ui/core';
import OrderItem from './OrderItem/OrderItem';
import { OrderPropType } from '../../../../propTypes';

export default function OrderItemList({ order, onClick }) {
  return (
    <div>
      {Object.keys(order.items).map(i => (
        <Grid item xs={12} key={shortid.generate()}>
          <OrderItem
            title={order.items[i].item.title}
            price={order.items[i].item.price}
            count={order.items[i].count}
            onClick={() => onClick(i)}
          />
        </Grid>
      ))}
    </div>
  );
}

OrderItemList.propTypes = {
  /** Array of items to display */
  order: OrderPropType.isRequired,
  /** Function that is called with the index of the item that
   * was clicked on. */
  onClick: PropTypes.func,
};

OrderItemList.defaultProps = {
  onClick: () => {},
};
