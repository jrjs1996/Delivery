import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { AdminPropType } from '../../../../propTypes';

export default function AdminListItem({ admin }) {
  return (
    <Grid item xs={12}>
      <Button variant="contained">{ admin.username }</Button>
    </Grid>
  );
}

AdminListItem.propTypes = {
  admin: AdminPropType.isRequired,
};
