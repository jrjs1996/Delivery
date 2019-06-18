import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';

export default function Item({ title, menuNumber }) {
  return (
    <Paper>
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
