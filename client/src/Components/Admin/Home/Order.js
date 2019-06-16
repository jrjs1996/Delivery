import React, { useState } from 'react';
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
import Item from './Item';


function getSteps(delivery) {
  let steps = ['Submitted', 'Preparing'];
  if (delivery) steps = steps.concat(['Waiting for Delivery', 'Out for Delivery']);
  else steps = steps.concat(['Waiting for Pickup']);
  steps = steps.concat(['Completed']);
  return steps;
}

export function Order({
  address,
  customerName,
  delivery,
  orderCreated,
  stage,
  id,
  items,
  updateOrder: updateAction,
}) {
  const steps = getSteps(delivery);
  const [expand, setExpand] = useState(false);
  return (
    <Paper
      onClick={() => setExpand(!expand)}
      style={{
        marginTop: '2%',
        marginLeft: '10%',
        marginRight: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {customerName}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {address}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {orderCreated}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Stepper activeStep={stage} style={{ padding: 0 }}>
            {steps.map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
          </Stepper>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit" onClick={() => { updateAction(id, { stage: stage + 1 }); }}>Next</Button>
        </Grid>
        <Grid item xs={12}>
          {expand ? items.map(i => <Item title={i.title} menuNumber={i.menuNumber} />) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

Order.propTypes = {
  address: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  delivery: PropTypes.bool.isRequired,
  orderCreated: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

export default connect(null, { updateOrder })(Order);
