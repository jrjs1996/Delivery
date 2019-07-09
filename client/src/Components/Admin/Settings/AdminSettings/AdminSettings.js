import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import SettingsMenuItem from '../SettingsMenu/SettingsMenuItem/SettingsMenuItem';

export default function AdminSettings({ match, onClick }) {
  return (
    <SettingsMenu title="Settings" onClick={onClick}>
      <SettingsMenuItem text="Change Username" to={`${match.path}username/`} />
      <SettingsMenuItem text="Change Password" to={`${match.path}password/`} />
      <SettingsMenuItem text="Edit Admins" to={`${match.path}admins/`} />
    </SettingsMenu>
  );
}

AdminSettings.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  onClick: PropTypes.func,
};

AdminSettings.defaultProps = {
  onClick: () => {},
};
