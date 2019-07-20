import React from 'react';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import SettingsMenu from '../../General/SettingsMenu/SettingsMenu';
import SettingsMenuItem from '../../General/SettingsMenu/SettingsMenuItem/SettingsMenuItem';
import Settings from '../../General/Settings/Settings';
import SettingsItem from '../../General/Settings/SettingsItem';
import ChangePassword from '../../General/ChangePassword/ChangePassword';
import { updateCustomer } from '../../../actions/customer/customer';
import EditInfo from './EditInfo';

export function SettingsComponent({
  currentCustomer,
  updateCustomerAction,
  ...rest
}) {
  return (
    <Settings {...rest}>
      <SettingsItem
        text="Change Password"
        match={rest.match}
        path="password/"
      >
        <ChangePassword
          currentUser={currentCustomer}
          updateAction={updateCustomerAction}
        />
      </SettingsItem>
      <SettingsItem
        text="Change Info"
        match={rest.match}
        path="changeinfo/"
      >
        <EditInfo
          addresses={currentCustomer.addresses}
          firstName={currentCustomer.firstName}
          id={currentCustomer._id}
          lastName={currentCustomer.lastName}
          onSubmit={updateCustomerAction}
        />
      </SettingsItem>
      <SettingsItem
        text="Manage Addresses"
      />
    </Settings>
  );
}

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

export default connect(mapStateToProps, { updateCustomerAction: updateCustomer})(SettingsComponent);
