import React from 'react';
import { Grid, TextField, Card, Button } from '@material-ui/core';

export default function AddMenuItem() {
  return (
    <Card style={{ marginLeft: '20%', marginRight: '20%', paddingLeft: '10%', paddingRight: '10%', paddingBottom: '1%'}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField placeholder="Title" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField type="number" placeholder="Price" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField placeholder="Description" multiline rows={5} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary">Submit</Button>
        </Grid>
      </Grid>
    </Card>
  );
}
