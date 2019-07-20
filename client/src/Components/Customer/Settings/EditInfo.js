import React from 'react';
import PropTypes from 'prop-types';
import SettingPage from '../../General/SettingPage/SettingPage';
import SettingPageInput from '../../General/SettingPage/SettingPageInput/SettingPageInput';
import InputList from '../../General/SettingPage/InputList/InputList';

export default function EditInfo({
  addresses, firstName, id, lastName, onSubmit,
}) {
  return (
    <SettingPage
      title="Edit Info"
      onSubmit={(submitData) => {
        submitData._id = id;
        onSubmit(submitData);
      }}
    >
      <SettingPageInput fullWidth name="firstName" label="First Name" value={firstName} />
      <SettingPageInput fullWidth name="lastName" label="Last Name" value={lastName} />
      <InputList name="addresses" value={addresses} title="Addresses:" />
    </SettingPage>
  );
}

EditInfo.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
