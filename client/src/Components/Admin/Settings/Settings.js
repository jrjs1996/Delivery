import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import SettingsMenuItem from './SettingsMenu/SettingsMenuItem';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import { Button, Grid } from '@material-ui/core';

const getPage = (page, setPage) => {
  console.log(page)
  switch (page) {
    case 0: return <ChangeUsername />;
    case 1: return <ChangePassword />;
    default: return (
      <div>
        <SettingsMenu title="Settings" onClick={setPage}>
          <SettingsMenuItem text="Change Username" />
          <SettingsMenuItem text="Change Password" />
          <SettingsMenuItem text="Edit Admins" />
        </SettingsMenu>
      </div>
    );
  }
};

export default function Settings() {
  const [page, setPage] = useState(-1);

  return (
    <div style={{ marginTop: '5%', marginRight: '25%', marginLeft: '25%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {page !== -1 ? <Button variant="contained" color="secondary" onClick={() => setPage(-1)}>Back</Button> : null }
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
