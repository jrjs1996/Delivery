import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import AdminMenuItemList from './AdminMenuItemList';
import AdminMenuItemForm from './AdminMenuItemForm';
import MenuButton from './AdminMenuButton';

import { locationPropType } from '../../../propTypes';


export default function AdminMenu({
  location,
}) {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div style={{
      paddingTop: '5%',
      marginLeft: '20%',
      marginRight: '20%',
      paddingBottom: '1%',
    }}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <MenuButton
            home="/admin/menu/"
            to="/admin/menu/additem/"
            onForward={() => setSelectedItem({})}
            pathname={location.pathname}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">
            Menu
          </Typography>
        </Grid>
      </Grid>
      <Route
        exact
        path="/admin/menu/"
        render={() => <AdminMenuItemList onSelect={i => setSelectedItem(i)} />}
      />
      <Route
        path="/admin/menu/additem/"
        render={() => <AdminMenuItemForm menuItem={selectedItem} />}
      />
    </div>
  );
}

AdminMenu.propTypes = {
  location: locationPropType.isRequired,
};
