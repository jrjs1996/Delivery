import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import MenuItemList from './MenuItemList';
import AddMenuItem from './AddMenuItem';
import { fetchMenu, addMenuItem, updateMenuItem } from '../../../actions/menuActions';

const getButton = (page, setPage, setSelectedItem, setUpdate) => {
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
        onClick={() => {
          setSelectedItem({});
          setUpdate(false);
          setPage(1);
        }}
      >
        <AddIcon />
      </Button>
    );
  }
};

function Menu({
  menu,
  fetchMenu:
  fetchMenuAction,
  addMenuItem:
  addAction,
  updateMenuItem: updateAction,
}) {
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetchMenuAction();
  }, [fetchMenuAction]);

  return (
    <div style={{ paddingTop: '5%' }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {getButton(page, setPage, setSelectedItem, setUpdate)}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">
            Menu
          </Typography>
        </Grid>
      </Grid>
      {(() => {
        switch (page) {
          case 1: return (
            <AddMenuItem
              onSubmit={(data) => {
                if (update) updateAction(data);
                else addAction(data);
                setPage(0);
              }}
              initTitle={selectedItem.title}
              initPrice={selectedItem.price}
              initDescription={selectedItem.description}
              initMenuNumber={selectedItem.menuNumber}
            />
          );
          default: return (
            <MenuItemList
              menu={menu}
              onSelect={(item) => {
                setSelectedItem(item);
                setUpdate(true);
                setPage(1);
              }}
            />
          );
        }
      })()}
    </div>
  );
}

Menu.propTypes = {
  addMenuItem: PropType.func.isRequired,
  fetchMenu: PropType.func.isRequired,
  menu: PropType.arrayOf(Object).isRequired,
  updateMenuItem: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { fetchMenu, addMenuItem, updateMenuItem })(Menu);
