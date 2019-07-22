import PropTypes from 'prop-types';
import React from 'react';

import { Paper, Typography, Grid } from '@material-ui/core';

export default function Item({
  title,
  menuNumber,
}) {
  return (
    <Paper className="Item">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6">
              {menuNumber}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6">
              {title}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

Item.propTypes = {
  /** The title of the menu item. */
  title: PropTypes.string.isRequired,
  /** The menu number of the menu item. */
  menuNumber: PropTypes.number.isRequired,
};
