import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import {
  Checkbox, FormControlLabel, Grid, Typography,
} from '@material-ui/core';

import OrderItemList from '../../../Admin/CreateOrder/OrderItemList/OrderItemList';
import { CustomerPropType, OrderPropType } from '../../../../propTypes';
import AddressInput from './AddressInput';

export default function SubmitOrderDialog({
  action,
  currentCustomer,
  currentOrder,
  onClose,
  open,
}) {
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(false);

  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      onClose={onClose}
      maxWidth="md"
      fullWidth
      open={open}
    >
      <DialogTitle>Submit Order</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <AddressInput
              address={address}
              currentCustomer={currentCustomer}
              setAddress={setAddress}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={<Checkbox value={delivery} onChange={() => setDelivery(!delivery)} />}
              label="Delivery"
            />
          </Grid>
        </Grid>
        <OrderItemList order={currentOrder} />
        <Typography variant="h5">
          Total: $
          {currentOrder.total}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            action(currentOrder, { address, delivery, customer: currentCustomer._id });
            onClose();
          }}
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SubmitOrderDialog.propTypes = {
  /** Action to submit the order. */
  action: PropTypes.func.isRequired,
  /** Current logged in customer. */
  currentCustomer: CustomerPropType.isRequired,
  /** Current order being made by the customer. */
  currentOrder: OrderPropType.isRequired,
  /** Function to close the dialog */
  onClose: PropTypes.func.isRequired,
  /** Whether to display the dialog. */
  open: PropTypes.bool.isRequired,
};
