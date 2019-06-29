import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Button } from '@material-ui/core';

export default function Customer({
  addresses,
  email,
  firstName,
  id,
  lastName,
  onDelete,
  onSelect,
}) {
  return (
    <Paper onClick={() => onSelect(id, firstName, lastName, addresses, email)}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          Name:
          <Paper>
            {`${firstName} ${lastName}`}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          Address:
          <Paper>
            {addresses ? addresses[0] : null}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          Email:
          <Paper>
            {email}
          </Paper>
        </Grid>
        { onDelete ? (
          <Button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          >
            Delete
          </Button>
        ) : null}
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
