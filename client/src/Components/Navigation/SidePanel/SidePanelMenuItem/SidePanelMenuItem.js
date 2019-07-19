import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    padding: 0,
  },
}));

export default function SideMenuItem({
  count,
  menuNumber,
  onAdd,
  onRemove,
  price,
  title,
}) {
  const classes = useStyles();
  return (
    <ListItem>
      <Grid container>
        <Grid item xs={9}>
          <ListItemText primary={`${title} $${price} x ${count} `} />
        </Grid>
        <Grid item xs={3}>
          <Button className={classes.button} onClick={() => onAdd(menuNumber)}><AddIcon /></Button>
          <Button className={classes.button} onClick={() => onRemove(menuNumber)}><RemoveIcon /></Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

SideMenuItem.propTypes = {
  count: PropTypes.number.isRequired,
  menuNumber: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
