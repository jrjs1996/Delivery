import React from 'react';
import PropTypes from 'prop-types';

import { AdminPropType, CustomerPropType } from '../../../propTypes';
import SettingPage from '../SettingPage/SettingPage';
import SettingPageInput from '../SettingPage/SettingPageInput/SettingPageInput';

const onClick = (submitData, currentUser, action) => {
  const { newPassword, confirmNewPassword } = submitData;
  const { _id } = currentUser;
  if (newPassword !== confirmNewPassword) {
    return "Error: Passwords don't match!";
  }
  action({ _id, password: newPassword });
  return 'Password Changed!';
};

export default function ChangePassword({ currentUser, updateAction }) {
  return (
    <SettingPage
      title="Change Password"
      onSubmit={submitData => onClick(submitData, currentUser, updateAction)}
    >
      <SettingPageInput
        required
        fullWidth
        name="newPassword"
        type="password"
        label="New Password"
      />
      <SettingPageInput
        required
        fullWidth
        name="confirmNewPassword"
        type="password"
        label="Confirm New Password"
      />
    </SettingPage>
  );
}

ChangePassword.propTypes = {
  updateAction: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([
    AdminPropType,
    CustomerPropType,
  ]).isRequired,
};
