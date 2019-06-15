import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { StepLabel } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { connect } from 'react-redux';
import { updateOrder } from '../../../actions/orderActions';

export default function MenuItem({ title, price, description, number }) {
  return (
    <Paper style={{marginTop: '2%', marginLeft: '10%', marginRight: '10%', paddingLeft: '2%', paddingRight: '2%' }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                {number}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" gutterBottom>
                ${price}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
