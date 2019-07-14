import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from '../Navigation/Navigation';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

export default function AdminComponent({
  history, match,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
