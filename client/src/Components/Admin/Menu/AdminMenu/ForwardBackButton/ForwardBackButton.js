import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


export default function ForwardBackButton({
  home,
  to,
  pathname,
  onForward,
  onBack,
  homeIcon,
  toIcon,
}) {
  let renderTo;
  let renderOnClick;
  let renderIcon;
  if (pathname === to) {
    renderTo = home;
    renderOnClick = onBack;
    renderIcon = (React.createElement(toIcon));
  } else {
    renderTo = to;
    renderOnClick = onForward;
    renderIcon = (React.createElement(homeIcon));
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


ForwardBackButton.propTypes = {
  /** Home location of the menu button */
  home: PropTypes.string.isRequired,
  /** Icon to display when at home */
  homeIcon: PropTypes.elementType.isRequired,
  /** Location to go to when the button is clicked */
  to: PropTypes.string.isRequired,
  /** Icon to display when at to */
  toIcon: PropTypes.elementType.isRequired,
  /** Browser location pathname */
  pathname: PropTypes.string.isRequired,
  /** Function to be called when the button is clicked when at home. */
  onForward: PropTypes.func,
  /** Function to be called  when the button is clicked when at to. */
  onBack: PropTypes.func,
};

ForwardBackButton.defaultProps = {
  onForward: () => {},
  onBack: () => {},
};
