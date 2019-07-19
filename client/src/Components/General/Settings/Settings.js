import { Button, Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SettingsMenuItem from '../SettingsMenu/SettingsMenuItem/SettingsMenuItem';

const renderBackButton = (pathname, history, matchPath) => {
  if (pathname !== matchPath) {
    return (
      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Back
      </Button>
    );
  }
  return null;
};

export default function Settings({
  children,
  className,
  history,
  location,
  match,
  title,
}) {
  return (
    <div className={className}>
      <Grid container spacing={1}>
        <Grid item sm={3}>
          {renderBackButton(location.pathname, history, match.path)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Route
            path={match.path}
            exact
            render={() => (
              <SettingsMenu title={title}>
                {
                  React.Children.map(children, child => (
                    <SettingsMenuItem text={child.props.text} to={`${match.path}${child.props.path}`} />
                  ))
                }
              </SettingsMenu>
            )}
          />
          {React.Children.map(children, child => React.cloneElement(child, { match }))}
        </Grid>
        <Grid item xs={12} sm={3} />
      </Grid>
    </div>
  );
}

Settings.propTypes = {
  /** SettingsItems to populate the menu with. */
  children: PropTypes.node.isRequired,
  /** Class for styling */
  className: PropTypes.string.isRequired,
  /** Router history */
  history: ReactRouterPropTypes.history.isRequired,
  /** Router location */
  location: ReactRouterPropTypes.location.isRequired,
  /** Router match */
  match: ReactRouterPropTypes.match.isRequired,
  /** Title to display at top of menu. */
  title: PropTypes.string,
};

Settings.defaultProps = {
  title: null,
};
