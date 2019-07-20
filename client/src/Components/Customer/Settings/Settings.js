import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CustomerPropType } from '../../../propTypes';
import { updateCustomer } from '../../../actions/customer/customer';
import ChangePassword from '../../General/ChangePassword/ChangePassword';
import EditInfo from './EditInfo';
import Settings from '../../General/Settings/Settings';
import SettingsItem from '../../General/Settings/SettingsItem';

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
    </Settings>
  );
}

SettingsComponent.propTypes = {
  currentCustomer: CustomerPropType.isRequired,
  updateCustomerAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentCustomer: state.customers.currentCustomer,
});

export default connect(mapStateToProps, {
  updateCustomerAction: updateCustomer,
})(SettingsComponent);
