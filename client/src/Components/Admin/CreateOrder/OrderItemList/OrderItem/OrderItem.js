import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid } from '@material-ui/core';

export default function OrderItem({ count, title, price, onClick }) {
  return (
    <Paper
      onClick={onClick}
      className="OrderItem"
    >
      <Grid spacing={0} container>
        <Grid item xs={6}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            $
            {price}
            x
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

OrderItem.propTypes = {
  /** Title of the menu item. */
  title: PropTypes.string.isRequired,
  /** Price of the menu item. */
  price: PropTypes.number.isRequired,
  /** Function to be called when clicked on. */
  onClick: PropTypes.func.isRequired,
};
