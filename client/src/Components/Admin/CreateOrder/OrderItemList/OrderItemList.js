import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';
import { Grid } from '@material-ui/core';
import OrderItem from './OrderItem/OrderItem';
import { menuItemPropType } from '../../../../propTypes';

export default function OrderItemList({ orderItems, onClick }) {
  return (
    <div>
      {orderItems.map((i, index) => (
        <Grid item xs={12} key={shortid.generate()}>
          <OrderItem
            title={i.title}
            price={i.price}
            onClick={() => onClick(index)}
          />
        </Grid>
      ))}
    </div>
  );
}

OrderItemList.propTypes = {
  /** Array of items to display */
  orderItems: PropTypes.arrayOf(menuItemPropType).isRequired,
  /** Function that is called with the index of the item that
   * was clicked on. */
  onClick: PropTypes.func.isRequired,
};
