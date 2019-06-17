import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import SettingsMenuItem from './SettingsMenu/SettingsMenuItem';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import { Button, Grid } from '@material-ui/core';

const getPage = (page, setPage) => {
  switch (page) {
    case 1: return <ChangeUsername />;
    case 2: return <ChangePassword />;
    default: return (
      <div>
        <SettingsMenu title="Settings">
          <SettingsMenuItem onClick={() => setPage(1)} text="Change Username" />
          <SettingsMenuItem onClick={() => setPage(2)} text="Change Password" />
          <SettingsMenuItem onClick={() => setPage(3)} text="Edit Admins" />
        </SettingsMenu>
      </div>
    );
  }
};

export default function Settings() {
  const [page, setPage] = useState(0);

  return (
    <div style={{ marginTop: '5%', marginRight: '25%', marginLeft: '25%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {page !== 0 ? <Button variant="contained" color="secondary" onClick={() => setPage(0)}>Back</Button> : null }
        </Grid>
        <Grid item xs={6}>
          {getPage(page, setPage)}
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
    //style={{ marginTop: '5%', marginLeft: '30%', marginRight: '30%' }}
  );
}
