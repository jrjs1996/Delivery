import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import ChangeUsername from './ChangeUsername';
import ChangePassword from './ChangePassword';
import AdminSettings from './AdminSettings';
import { locationPropType } from '../../../propTypes';

const renderBackButton = (pathname) => {
  if (pathname !== '/admin/settings') {
    return (
      <Link to="/admin/settings">
        <Button variant="contained" color="secondary">
          Back
        </Button>
      </Link>
    );
  }
  return null;
};

export default function Settings(props) {
  const { location } = props;
  return (
    <div style={{ marginTop: '5%', marginRight: '25%', marginLeft: '25%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {renderBackButton(location.pathname)}
        </Grid>
        <Grid item xs={6}>
          <Route
            path="/admin/settings/"
            exact
            component={AdminSettings}
          />
          <Route path="/admin/settings/username/" component={ChangeUsername} />
          <Route path="/admin/settings/password/" component={ChangePassword} />
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}

Settings.propTypes = {
  location: locationPropType.isRequired,
};
