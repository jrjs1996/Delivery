import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SettingsMenu from '../../General/SettingsMenu/SettingsMenu';
import SettingsMenuItem from '../../General/SettingsMenu/SettingsMenuItem/SettingsMenuItem';

export default function Settings({
  match,
  onClick
}) {
  return (
    <SettingsMenu title="Settings">
      <SettingsMenuItem text="Edit Info" />
      <SettingsMenuItem text="Change Password" />
    </SettingsMenu>
  );
}
