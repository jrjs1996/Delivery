import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AdminPropType } from '../../../../propTypes';
import { changeCurrentAdminPassword } from '../../../../actions/adminActions';
import SettingPage from '../SettingPage/SettingPage';
import SettingPageInput from '../SettingPage/SettingPageInput/SettingPageInput';

const onClick = (submitData, currentAdmin, action) => {
  const { newPassword, confirmNewPassword } = submitData;
  const { _id } = currentAdmin;
  if (newPassword !== confirmNewPassword) {
    return 'Error: Passwords don\'t match!';
  }
  action(_id, newPassword);
  return 'Password Changed!';
};

export function ChangePasswordComponent({ currentAdmin, action }) {
  return (
    <SettingPage
      title="Change Password"
      onSubmit={submitData => onClick(submitData, currentAdmin, action)}
    >
      <SettingPageInput required fullWidth name="newPassword" type="password" label="New Password" />
      <SettingPageInput required fullWidth name="confirmNewPassword" type="password" label="Confirm New Password" />
    </SettingPage>
  );
}

ChangePasswordComponent.propTypes = {
  action: PropTypes.func.isRequired,
  currentAdmin: AdminPropType.isRequired,
};

const mapStateToProps = state => ({
  currentAdmin: state.admins.currentAdmin,
});

export default connect(mapStateToProps, { action: changeCurrentAdminPassword })(ChangePasswordComponent);
