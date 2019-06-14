import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const submit = () => {
  window.confirm('are you sure?');
};

export default function ChangeUsername({ back }) {
  const [newUsername, setNewUserName] = useState('');

  return (
    <Paper style={{
      marginTop: '5%',
      marginLeft: '30%',
      marginRight: '30%',
      paddingLeft: '2%',
      paddingRight: '2%',
    }}
    >

      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={back}>Back</Button>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4" gutterBottom>
            Change Username
          </Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            required
            id="newUsername"
            name="newUsername"
            label="New Username"
            fullWidth
            onChange={e => setNewUserName(e.target.value)}
            value={newUsername}
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={submit}>Change username</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

ChangeUsername.propTypes = {
  back: PropTypes.func.isRequired,
};
