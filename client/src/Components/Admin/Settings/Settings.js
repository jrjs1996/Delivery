import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import './Settings.css';
import { AdminPropType } from '../../../propTypes';
import {
  createAdmin,
  fetchAdmins,
  updateAdmin,
  updateCurrentAdmin,
} from '../../../actions/adminActions';
import AdminList from './AdminList/AdminList';
import AdminSettings from './AdminSettings/AdminSettings';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeUsername from './ChangeUsername/ChangeUsername';

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

export function SettingsComponent({
  admins,
  createAction,
  currentAdmin,
  fetchAction,
  history,
  location,
  match,
  updateAction,
  updateCurrentAdminAction,
}) {
  return (
    <div className="Settings">
      <Grid container spacing={1}>
        <Grid item sm={3}>
          {renderBackButton(location.pathname, history, match.path)}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Route path={match.path} exact component={AdminSettings} />
          <Route
            path={`${match.path}username/`}
            render={props => (
              <ChangeUsername
                currentAdmin={currentAdmin}
                updateAction={updateCurrentAdminAction}
                {...props}
              />
            )}
          />
          <Route
            path={`${match.path}password/`}
            render={props => (
              <ChangePassword
                currentAdmin={currentAdmin}
                updateAction={updateCurrentAdminAction}
                {...props}
              />
            )}
          />
          <Route
            path={`${match.path}admins/`}
            render={props => (
              <AdminList
                admins={admins}
                createAction={createAction}
                fetchAction={fetchAction}
                history={history}
                match={match}
                updateAction={updateAction}
                {...props}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3} />
      </Grid>
    </div>
  );
}

SettingsComponent.propTypes = {
  admins: PropTypes.arrayOf(AdminPropType).isRequired,
  createAction: PropTypes.func.isRequired,
  currentAdmin: AdminPropType.isRequired,
  fetchAction: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  updateAction: PropTypes.func.isRequired,
  updateCurrentAdminAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admins: state.admins.admins,
  currentAdmin: state.admins.currentAdmin,
});

export default connect(
  mapStateToProps,
  {
    createAction: createAdmin,
    fetchAction: fetchAdmins,
    updateAction: updateAdmin,
    updateCurrentAdminAction: updateCurrentAdmin,
  },
)(SettingsComponent);
