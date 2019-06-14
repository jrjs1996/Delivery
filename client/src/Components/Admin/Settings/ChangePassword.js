import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeCurrentAdminPassword } from '../../../actions/adminActions';

const onClick = async (newPassword, confirmPassword, id, setMessage, action) => {
  changeCurrentAdminPassword(id, newPassword);
  if (newPassword !== confirmPassword) {
    setMessage("Passwords don't match!");
    return;
  }
  await action(id, newPassword);
  setMessage('New password created!');
};

function ChangePassword({ back, currentAdmin, changeCurrentAdminPassword: action }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
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
            Change Password
          </Typography>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            required
            id="newPassword"
            name="newPassword"
            label="New Password"
            fullWidth
            type="password"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            required
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confrim New Password"
            fullWidth
            type="password"
            onChange={e => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
          />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClick(newPassword,
              confirmNewPassword,
              currentAdmin._id,
              setMessage,
              action)}
          >
            Change password
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        {message}
      </Typography>
    </Paper>
  );
}

ChangePassword.propTypes = {
  back: PropTypes.func.isRequired,
  changeCurrentAdminPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});


export default connect(mapStateToProps, { changeCurrentAdminPassword })(ChangePassword);
