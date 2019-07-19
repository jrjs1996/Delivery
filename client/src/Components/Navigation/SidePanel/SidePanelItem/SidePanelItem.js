import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SideMenuItem({
  to,
  children,
  text,
}) {
  return (
    <Link to={to} style={{ color: '#191f19', textDecoration: 'None' }}>
      <ListItem button key={to}>
        <ListItemIcon>{ children }</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
}

SideMenuItem.propTypes = {
  /** The address this item links to. */
  to: PropTypes.string.isRequired,
  /** Text to display on the item */
  text: PropTypes.string.isRequired,
  /** A single icon to display */
  children: PropTypes.node.isRequired,
};

export default SideMenuItem;
