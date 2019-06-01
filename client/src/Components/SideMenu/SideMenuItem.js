import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function SideMenuItem(props) {
  const { to } = props;
  const { children } = props;
  const { text } = props;
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
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SideMenuItem;
