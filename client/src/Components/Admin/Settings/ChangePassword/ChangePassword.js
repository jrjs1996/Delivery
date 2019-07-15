import React from 'react';
import PropTypes from 'prop-types';

import { AdminPropType } from '../../../../propTypes';
import SettingPage from '../../../General/SettingPage/SettingPage';
import SettingPageInput from '../../../General/SettingPage/SettingPageInput/SettingPageInput';

const onClick = (submitData, currentAdmin, action) => {
  const { newPassword, confirmNewPassword } = submitData;
  const { _id } = currentAdmin;
  if (newPassword !== confirmNewPassword) {
    return "Error: Passwords don't match!";
  }
  action({ _id, password: newPassword });
  return 'Password Changed!';
};

export default function ChangePassword({ currentAdmin, updateAction }) {
  return (
    <SettingPage
      title="Change Password"
      onSubmit={submitData => onClick(submitData, currentAdmin, updateAction)}
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
  currentAdmin: AdminPropType.isRequired,
};
