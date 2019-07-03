import React from 'react';
import shortid from 'shortid';
import { Grid } from '@material-ui/core';
import OrderItem from './OrderItem';

export default function OrderItemList({ orderItems, onClick }) {
  return (
    <div>
      {orderItems.map((i, index) => (
        <Grid item xs={12} key={shortid.generate()}>
          <OrderItem
            item={i}
            index={index}
            onClick={() => onClick(index)}
          />
        </Grid>
      ))}
    </div>
  );
}
