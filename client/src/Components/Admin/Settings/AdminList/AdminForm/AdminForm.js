import React, { useState } from 'react'
import SettingPage from '../../SettingPage/SettingPage';
import SettingPageInput from '../../SettingPage/SettingPageInput/SettingPageInput';

export default function AdminForm({
  id,
  onSubmit,
  username,
}) {
  const [originalName] = useState(username);
  return (
    <SettingPage
      title={id ? `Update Admin "${originalName}"` : 'Add Admin'}
      onSubmit={(data) => {
        if (id) {
          data._id = id;
        }
        onSubmit(data);
      }}
    >
      <SettingPageInput required fullWidth name="username" label="Username" value={username} />
      <SettingPageInput required fullWidth name="password" label="Password" type="password" />
    </SettingPage>
  );
}
