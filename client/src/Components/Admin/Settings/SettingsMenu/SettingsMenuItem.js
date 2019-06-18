import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const renderButton = (onClick, text) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
  >
    {text}
  </Button>
);

export default function SettingsMenuItem({ onClick, text, to }) {
  return (
    <Grid item xs={12}>
      {to ? <Link to={to}>{renderButton(onClick, text)}</Link> : renderButton(onClick, text) }
    </Grid>
  );
}

SettingsMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
};

SettingsMenuItem.defaultProps = {
  to: null,
};
