import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';

export default function SettingsMenuItem({ onClick, text }) {
  return (
    <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={onClick}>{text}</Button>
    </Grid>
  );
}

SettingsMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
