import React from 'react';
import PropTypes from 'prop-types';
import SettingPage from '../../../General/SettingPage/SettingPage';
import SettingPageInput from '../../../General/SettingPage/SettingPageInput/SettingPageInput';
import InputList from '../../../General/SettingPage/InputList/InputList';

export default function CustomerForm({
  addresses, email, firstName, id, lastName, onSubmit,
}) {
  return (
    <SettingPage
      className="CustomerForm"
      title={id ? 'Update Customer' : 'Add Customer'}
      onSubmit={(data) => {
        if (id) {
          data._id = id;
        }
        return onSubmit(data);
      }}
    >
      <SettingPageInput required fullWidth name="firstName" label="First Name" value={firstName} />
      <SettingPageInput required fullWidth name="lastName" label="Last Name" value={lastName} />
      <SettingPageInput required fullWidth name="email" label="Email" value={email} />
      <SettingPageInput required fullWidth name="password" label="Password" type="password" />
      <InputList name="addresses" value={addresses} title="Addresses:" />
    </SettingPage>
  );
}

CustomerForm.propTypes = {
  /** Addresses of the customer */
  addresses: PropTypes.arrayOf(PropTypes.string),
  /** Initial value of email input */
  email: PropTypes.string,
  /** Initial value of firstName input */
  firstName: PropTypes.string,
  /** Id of customer to update. Will change form title if provided. */
  id: PropTypes.string,
  /** Initial value of lastName input */
  lastName: PropTypes.string,
  /** Function to call when on submit.
   * Passed an object that contains the input data
   * and the id if provided. */
  onSubmit: PropTypes.func.isRequired,
};

CustomerForm.defaultProps = {
  addresses: [],
  email: '',
  firstName: '',
  id: undefined,
  lastName: '',
};
