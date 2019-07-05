import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shortid from 'shortid';

import { StepLabel, Hidden } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { menuItemPropType } from '../../../../propTypes';

import Item from './Item/Item';

function getSteps(delivery) {
  let steps = ['Submitted', 'Preparing'];
  if (delivery) steps = steps.concat(['Waiting for Delivery', 'Out for Delivery']);
  else steps = steps.concat(['Waiting for Pickup']);
  steps = steps.concat(['Completed']);
  return steps;
}

export default function Order({
  address,
  customerName,
  delivery,
  id,
  items,
  orderCreated,
  stage,
  updateAction,
}) {
  const steps = getSteps(delivery);
  const [expand, setExpand] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));


  return (
    <Paper
      onClick={() => setExpand(!expand)}
      style={{
        marginBottom: '20px',
        paddingTop: '10px',
      }}
      className="Order"
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {customerName}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {address}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              {orderCreated}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Stepper activeStep={stage} style={{ padding: 0 }}>
            {steps.map(s => (
              <Step key={s}>
                <StepLabel>
                  <Hidden mdDown implementation="css">
                    {s}
                  </Hidden>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              updateAction(id, { stage: stage + 1 });
            }}
          >
            Next
          </Button>
        </Grid>
        <Grid item xs={12}>
          {expand && items.length ? (
            <div style={{ paddingTop: 12, paddingBottom: 14 }}>
              {items.map(i => (
                <Item title={i.title} key={shortid.generate()} menuNumber={i.menuNumber} />
              ))}
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

Order.propTypes = {
  /** Address of the order */
  address: PropTypes.string.isRequired,
  /** Name of the customer that placed the order */
  customerName: PropTypes.string.isRequired,
  /** True if a delivery order */
  delivery: PropTypes.bool.isRequired,
  /** Id of the order */
  id: PropTypes.string.isRequired,
  /** The menu items that belong to the order */
  items: PropTypes.arrayOf(menuItemPropType).isRequired,
  /** The date the order was created. */
  orderCreated: PropTypes.string.isRequired,
  /** The stage of the order */
  stage: PropTypes.number.isRequired,
  /** Action to update the order. This is called when the next
   * button is clicked. Is given the id of the order and an object
   * containing the new order stage. */
  updateAction: PropTypes.func.isRequired,
};
