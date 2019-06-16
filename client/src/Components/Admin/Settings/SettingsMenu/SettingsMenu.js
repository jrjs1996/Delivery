import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import SettingsMenuItem from './SettingsMenuItem';

export default function SettingsMenu(props) {
  return (
    <Paper style={{
      marginTop: '5%',
      marginLeft: '30%',
      marginRight: '30%',
      paddingLeft: '10%',
      paddingRight: '10%',
    }}
    >
      <Typography variant="h4" gutterBottom>
          Settings
      </Typography>
      <Grid container spacing={3}>
        {props.children}
      </Grid>
    </Paper>
  );
}
