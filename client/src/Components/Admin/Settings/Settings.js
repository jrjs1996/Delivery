import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu';

export default function Settings() {
  const [page, setPage] = useState(0);

  switch (page) {
    case 1: return <h1>Username</h1>;
    case 2: return <h1>Password</h1>;
    default: return (
      <SettingsMenu
        onChangeUsername={() => setPage(1)} 
        onChangePassword={() => setPage(2)}
      />
    );
  }
}
