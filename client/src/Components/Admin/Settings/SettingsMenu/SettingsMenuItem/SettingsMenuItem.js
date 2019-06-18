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
      {to ? <Link data-testid="link" to={to}>{renderButton(onClick, text)}</Link> : renderButton(onClick, text) }
    </Grid>
  );
}

SettingsMenuItem.propTypes = {
  /** Prop provided by the parent. SettingsMenu
   * Dont set manually. */
  onClick: PropTypes.func.isRequired,
  /** Text of the menu item. */
  text: PropTypes.string.isRequired,
  /** If provided the menu item will be a link to the
   * address specified in this prop. */
  to: PropTypes.string,
};

SettingsMenuItem.defaultProps = {
  to: null,
};
