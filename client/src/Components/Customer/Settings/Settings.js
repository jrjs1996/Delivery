import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SettingsMenu from '../../General/SettingsMenu/SettingsMenu';
import SettingsMenuItem from '../../General/SettingsMenu/SettingsMenuItem/SettingsMenuItem';
import Settings from '../../General/Settings/Settings';
import SettingsItem from '../../General/Settings/SettingsItem';

export default function SettingsComponent({
  onClick,
  ...rest
}) {
  return (
    <Settings {...rest}>
      <SettingsItem
        text="Change Password"
      />
      <SettingsItem
        text="Change Info"
      />
      <SettingsItem
        text="Manage Addresses"
      />
    </Settings>
  );
}
