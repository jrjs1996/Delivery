import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Button, Typography,
} from '@material-ui/core';

export default function Customer({
  addresses,
  email,
  firstName,
  id,
  index,
  lastName,
  onDelete,
  onSelect,
}) {
  return (
    <Paper onClick={() => onSelect(index)} className="Customer">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={2}>
              Name:
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography variant="h6" gutterBottom>
                <Paper>{`${firstName} ${lastName}`}</Paper>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={2}>
              Address:
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography variant="h6" gutterBottom>
                <Paper>{addresses ? addresses[0] : null}</Paper>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={2}>
              Email:
            </Grid>
            <Grid item xs={12} lg={10}>
              <Typography variant="h6" gutterBottom>
                <Paper>{email}</Paper>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          {onDelete ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

Customer.propTypes = {
  /** Street address of the customer */
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Customers email */
  email: PropTypes.string.isRequired,
  /** Customers first name */
  firstName: PropTypes.string.isRequired,
  /** Id of the customer */
  id: PropTypes.string,
  /** Index of the customer in the customer list */
  index: PropTypes.number.isRequired,
  /** Customers last name */
  lastName: PropTypes.string.isRequired,
  /** Function called when the on delete button is clicked.
   * If this prop is not provided a delete button isn't displayed.
   * Passed the id prop */
  onDelete: PropTypes.func,
  /** Function called when the component is clicked on anywhere
   * besides the delete button. Function is passed:
   * (id, firstName, lastName, address, email) */
  onSelect: PropTypes.func,
};

Customer.defaultProps = {
  onDelete: null,
  onSelect: () => {},
  id: undefined,
};
