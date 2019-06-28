import React from 'react';
import PropType from 'prop-types';
import SettingPage from '../../Settings/SettingPage/SettingPage';
import SettingPageInput from '../../Settings/SettingPage/SettingPageInput/SettingPageInput';
import InputList from '../../Settings/SettingPage/InputList/InputList';

export default function CustomerForm({
  addresses,
  email,
  firstName,
  id,
  lastName,
  onSubmit,
}) {
  return (
    <SettingPage
      title={id ? 'Update Customer' : 'Add Customer'}
      onSubmit={(data) => {
        if (id) {
          data._id = id;
        }
        onSubmit(data);
      }}
    >
      <SettingPageInput required fullWidth name="firstName" label="First Name" value={firstName} />
      <SettingPageInput required fullWidth name="lastName" label="Last Name" value={lastName} />
      <SettingPageInput required fullWidth name="email" label="Email" value={email} />
      <SettingPageInput required fullWidth name="password" label="Password" type="password" />
      <InputList name="addresses" value={addresses} />
    </SettingPage>
  );
}

CustomerForm.propTypes = {
  /** Initial value of address input */
  address: PropType.string,
  /** Initial value of email input */
  email: PropType.string,
  /** Initial value of firstName input */
  firstName: PropType.string,
  /** Id of customer to update. Will change form title if provided. */
  id: PropType.string,
  /** Initial value of lastName input */
  lastName: PropType.string,
  /** Function to call when on submit.
   * Passed an object that contains the input data
   * and the id if provided. */
  onSubmit: PropType.func.isRequired,
};

CustomerForm.defaultProps = {
  address: '',
  email: '',
  firstName: '',
  id: undefined,
  lastName: '',
};