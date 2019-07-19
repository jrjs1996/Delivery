import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

export default function SettingsItem({
  children,
  match,
  path,
  text,
}) {
  return (
    <Route
      path={`${match.path}${path}`}
      render={props => React.Children.map(children, child => React.cloneElement(child, {
        ...props,
      }))
      }
    />
  );
}

SettingsItem.propTypes = {
  /** The component to render at the path */
  children: PropTypes.node.isRequired,
  /** Given by the Settings parent component. Path of the parent */
  match: ReactRouterPropTypes.match.isRequired,
  /** Path to this component relative to the parent. */
  path: PropTypes.string.isRequired,
  /** Text of the button in the menu. */
  text: PropTypes.string.isRequired,
};
