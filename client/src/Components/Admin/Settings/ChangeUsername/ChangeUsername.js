/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import { AdminPropType } from '../../../../propTypes';
import SettingPage from '../../../General/SettingPage/SettingPage';
import SettingPageInput from '../../../General/SettingPage/SettingPageInput/SettingPageInput';

const onSubmit = (submitData, currentAdmin, action) => {
  action({ _id: currentAdmin._id, username: submitData.newUsername });
  return 'Username Updated';
};

export default function ChangeUsernameComponent({ currentAdmin, updateAction }) {
  return (
    <SettingPage
      title="Change Username"
      onSubmit={submitData => onSubmit(submitData, currentAdmin, updateAction)}
    >
      <SettingPageInput required fullWidth name="newUsername" label="New Username" />
    </SettingPage>
  );
}

ChangeUsernameComponent.propTypes = {
  currentAdmin: AdminPropType.isRequired,
  updateAction: PropTypes.func.isRequired,
};
