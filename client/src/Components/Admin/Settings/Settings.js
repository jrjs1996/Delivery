import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import SettingsMenuItem from './SettingsMenu/SettingsMenuItem';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';

export default function Settings() {
  const [page, setPage] = useState(0);

  switch (page) {
    case 1: return <ChangeUsername back={() => setPage(0)} />;
    case 2: return <ChangePassword back={() => setPage(0)} />;
    default: return (
      <SettingsMenu>
        <SettingsMenuItem onClick={() => setPage(1)} text="Change Username" />
        <SettingsMenuItem onClick={() => setPage(2)} text="Change Password" />
        <SettingsMenuItem onClick={() => setPage(3)} text="Edit Admins" />
      </SettingsMenu>
    );
  }
}
