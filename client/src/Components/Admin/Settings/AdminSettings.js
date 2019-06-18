import React from 'react';
import PropTypes from 'prop-types';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import SettingsMenuItem from './SettingsMenu/SettingsMenuItem';

export default function AdminSettings({ onClick }) {
  return (
    <SettingsMenu title="Settings" onClick={onClick}>
      <SettingsMenuItem text="Change Username" to="/admin/settings/username/" />
      <SettingsMenuItem text="Change Password" to="/admin/settings/password/" />
      <SettingsMenuItem text="Edit Admins" to="/admin/settings/admins/" />
    </SettingsMenu>
  );
}

AdminSettings.propTypes = {
  onClick: PropTypes.func,
};

AdminSettings.defaultProps = {
  onClick: () => {},
};
