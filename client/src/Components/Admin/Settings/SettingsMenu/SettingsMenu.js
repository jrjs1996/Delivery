import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ChildrenPropType } from '../../../../propTypes';

export default function SettingsMenu({ children, title }) {
  return (
    <Paper style={{
      paddingLeft: '10%',
      paddingRight: '10%',
    }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Paper>
  );
}

SettingsMenu.propTypes = {
  children: ChildrenPropType.isRequired,
  title: PropTypes.string,
};

SettingsMenu.defaultProps = {
  title: '',
};
