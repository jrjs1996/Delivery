import PropTypes from 'prop-types';
import React from 'react';
import SettingPage from '../../../../General/SettingPage/SettingPage';
import SettingPageInput from '../../../../General/SettingPage/SettingPageInput/SettingPageInput';

export default function AdminForm({ id, onSubmit, username }) {
  return (
    <SettingPage
      title={id ? `Update Admin "${username}"` : 'Add Admin'}
      onSubmit={(data) => {
        if (id) {
          data._id = id;
        }
        onSubmit(data);
        return 'Admin Updated';
      }}
    >
      <SettingPageInput required fullWidth name="username" label="Username" value={username} />
      <SettingPageInput required fullWidth name="password" label="Password" type="password" />
    </SettingPage>
  );
}

AdminForm.propTypes = {
  /** Id of the user if modifying a user. */
  id: PropTypes.string,
  /** Function to be called when the form is submitted. Is given
   * an object with the username and password that was entered. As
   * well as the users id if modifying a user.
   */
  onSubmit: PropTypes.func.isRequired,
  /** Username of the user if modifying. */
  username: PropTypes.string,
};

AdminForm.defaultProps = {
  id: null,
  username: null,
};
