import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
  },
}));

const handleClose = (reason, setOpen) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

export function ErrorMessage({
  message,
  errorCount,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [lastError, setLastError] = useState(-1);
  if (message && !open && errorCount > lastError) {
    setLastError(errorCount);
    setOpen(true);
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      open={open}
      onClose={(e, reason) => handleClose(reason, setOpen)}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="error message"
        message={(
          <p id="client-snackbar" className={classes.message}>
            <ErrorIcon />
            {message}
          </p>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            id="closeErrorMessageButton"
            onClick={(e, reason) => handleClose(reason, setOpen)}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

ErrorMessage.propTypes = {
  /** Total number of errors that have occured. */
  errorCount: PropTypes.number.isRequired,
  /** Error message to display. */
  message: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errorCount: state.error.errorCount,
  message: state.error.message,
});

export default connect(
  mapStateToProps,
  {},
)(ErrorMessage);
