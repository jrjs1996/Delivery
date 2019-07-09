import React from 'react';
import { Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Grid } from '@material-ui/core';
import ChangeUsername from './ChangeUsername/ChangeUsername';
import ChangePassword from './ChangePassword/ChangePassword';
import AdminSettings from './AdminSettings/AdminSettings';
import AdminList from './AdminList/AdminList';
import './Settings.css';

const renderBackButton = (pathname, history) => {
  if (pathname !== '/admin/settings/') {
    return (
      <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
        Back
      </Button>
    );
  }
  return null;
};

export default function Settings({ location, history, match }) {
  return (
    <div className="Settings">
      <Grid container spacing={1}>
        <Grid item sm={3}>
          {renderBackButton(location.pathname, history)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Route path={match.path} exact component={AdminSettings} />
          <Route path={`${match.path}username/`} component={ChangeUsername} />
          <Route path={`${match.path}password/`} component={ChangePassword} />
          <Route path={`${match.path}admins/`} component={AdminList} />
        </Grid>
        <Grid item xs={12} sm={3} />
      </Grid>
    </div>
  );
}

Settings.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};
