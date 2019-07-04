/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AdminPropType } from '../../../../propTypes';
import { changeCurrentAdminUsername } from '../../../../actions/adminActions';
import SettingPage from '../SettingPage/SettingPage';
import SettingPageInput from '../SettingPage/SettingPageInput/SettingPageInput';

const onSubmit = (submitData, currentAdmin, action) => {
  action(currentAdmin._id, submitData.newUsername);
  return 'Username Updated';
};

export function ChangeUsernameComponent({ currentAdmin, changeCurrentAdminUsername: action }) {
  return (
    <SettingPage
      title="Change Username"
      onSubmit={submitData => onSubmit(submitData, currentAdmin, action)}
    >
      <SettingPageInput required fullWidth name="newUsername" label="New Username" />
    </SettingPage>
  );
}

ChangeUsernameComponent.propTypes = {
  changeCurrentAdminUsername: PropTypes.func.isRequired,
  currentAdmin: AdminPropType.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(mapStateToProps, { changeCurrentAdminUsername })(ChangeUsernameComponent);
