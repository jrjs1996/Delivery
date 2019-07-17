import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function LoginDialog({ action, onClose, open }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => action(email, password)} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  action: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
};
