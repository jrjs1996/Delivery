import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ChildrenPropType } from '../../../../propTypes';

export default function SettingsMenu({ children, title, onClick }) {
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
        {React.Children.map(children, (child, i) => React.cloneElement(child, {
          onClick: () => onClick(i),
        }))}
      </Grid>
    </Paper>
  );
}

SettingsMenu.propTypes = {
  children: ChildrenPropType.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SettingsMenu.defaultProps = {
  title: '',
};
