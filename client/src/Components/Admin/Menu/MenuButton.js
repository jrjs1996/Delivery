import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function MenuButton({
  home,
  to,
  pathname,
  onForward,
  onBack,
}) {
  let renderTo;
  let renderOnClick;
  let renderIcon;
  if (pathname === to) {
    renderTo = home;
    renderOnClick = onForward;
    renderIcon = (<ArrowBackIcon />);
  } else {
    renderTo = to;
    renderOnClick = onBack;
    renderIcon = (<AddIcon />);
  }
  return (
    <Link to={renderTo}>
      <Button
        variant="contained"
        color="secondary"
        onClick={renderOnClick}
      >
        {renderIcon}
      </Button>
    </Link>
  );
}


MenuButton.propTypes = {
  /** Home location of the menu button */
  home: PropTypes.string.isRequired,
  /** Location to go to when the button is clicked */
  to: PropTypes.string.isRequired,
  /** Browser location pathname */
  pathname: PropTypes.string.isRequired,
  /** Function to be called when the button is clicked when at home. */
  onForward: PropTypes.func,
  /** Function to be called  when the button is clicked when at to. */
  onBack: PropTypes.func,
};

MenuButton.defaultProps = {
  onForward: () => {},
  onBack: () => {},
};
