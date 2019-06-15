import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItemList from './MenuItemList';
import AddMenuItem from './AddMenuItem';

const getPage = (page) => {
  switch (page) {
    case 1: return <AddMenuItem />;
    default: return <MenuItemList />;
  }
};

const getButton = (page, setPage) => {
  switch (page) {
    case 1: return (
      <Button 
        variant="contained"
        color="secondary"
        onClick={() => setPage(0)}
      >
        <ArrowBackIcon />
      </Button>
    );
    default: return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setPage(1)}
      >
        <AddIcon />
      </Button>
    );
  }
};

export default function Menu() {
  const [page, setPage] = useState(0);

  return (
    <div style={{ paddingTop: '5%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {getButton(page, setPage)}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">
            Menu
          </Typography>
        </Grid>
      </Grid>
      {getPage(page)}
    </div>
  );
}
