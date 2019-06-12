import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../../actions/orderActions';

export default function Order(props) {
  const { address, customerName, delivery, orderCreated, stage } = props;
  return (
    <Paper style={{marginTop: '2%', marginLeft: '10%', marginRight: '10%', paddingLeft: '2%', paddingRight: '2%' }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {customerName}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {address}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {orderCreated}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {stage}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper color="primary">
            <Typography variant="h6" gutterBottom>
              {delivery.toString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" type="submit">Next Stage</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
