import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';

export default function Settings() {
  const [page, setPage] = useState(0);

  switch (page) {
    case 1: return <ChangeUsername back={() => setPage(0)} />;
    case 2: return <ChangePassword back={() => setPage(0)} />;
    default: return (
      <SettingsMenu
        onChangeUsername={() => setPage(1)}
        onChangePassword={() => setPage(2)}
      />
    );
  }
}
