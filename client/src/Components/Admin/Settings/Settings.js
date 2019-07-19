import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
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
} from '../../../actions/admin/admin';
import AdminList from './AdminList/AdminList';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeUsername from './ChangeUsername/ChangeUsername';
import Settings from '../../General/Settings/Settings';
import SettingsItem from '../../General/Settings/SettingsItem';

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
    <Settings
      history={history}
      location={location}
      match={match}
      title="Settings"
    >
      <SettingsItem
        path="username/"
        text="Change Username"
      >
        <ChangeUsername
          currentAdmin={currentAdmin}
          updateAction={updateCurrentAdminAction}
        />
      </SettingsItem>
      <SettingsItem
        path="password/"
        text="Change Password"
      >
        <ChangePassword
          currentAdmin={currentAdmin}
          updateAction={updateCurrentAdminAction}
        />
      </SettingsItem>
      <SettingsItem
        path="admins/"
        text="Edit Admins"
      >
        <AdminList
          admins={admins}
          createAction={createAction}
          fetchAction={fetchAction}
          history={history}
          match={match}
          updateAction={updateAction}
        />
      </SettingsItem>
    </Settings>
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
