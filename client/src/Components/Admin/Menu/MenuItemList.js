import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';
import { fetchMenu } from '../../../actions/menuActions';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

function MenuItemList({ menu, fetchMenu }) {

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const menuItems = menu.map((i) => {
    return (
      <MenuItem
        title={i.title}
        price={i.price}
        description={i.description}
        number={i.menuNumber}
      />
    );
  });

  return (
    <div>
      {menuItems}
    </div>
  );
}

const mapStateToProps = state => ({
  menu: state.menu.items,
});

export default connect(mapStateToProps, { fetchMenu })(MenuItemList);
