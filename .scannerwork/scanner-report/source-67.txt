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
  /** Should all be SettingsMenuItems. Item in the menu. */
  children: ChildrenPropType.isRequired,
  /** Title that appears at the top of the menu. */
  title: PropTypes.string,
  /** Function that will be called when an item is clicked
   * on. Given the index of the item. */
  onClick: PropTypes.func.isRequired,
};

SettingsMenu.defaultProps = {
  title: '',
};
