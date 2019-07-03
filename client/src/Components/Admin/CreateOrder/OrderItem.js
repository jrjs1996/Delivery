import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Grid } from '@material-ui/core';
import { menuItemPropType } from '../../../propTypes';

export default function OrderItem({ item, onClick, index }) {
  return (
    <Paper
      onClick={() => onClick(index)}
      className="OrderItem"
    >
      <Grid spacing={3} container>
        <Grid item xs={6}>
          <Typography variant="h6">
            {item.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            $
            {item.price}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

OrderItem.propTypes = {
  item: menuItemPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
