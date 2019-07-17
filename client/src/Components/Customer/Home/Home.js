import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItemList from '../../General/MenuItemList/MenuItemList';
import { fetchMenu } from '../../../actions/menu/menu';
import { menuItemPropType } from '../../../propTypes';

export function HomeComponent({
  fetchAction,
  menuItems,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <div>
      <MenuItemList
        menu={menuItems}
        onSelect={() => console.log('onSelect')}
      />
    </div>
  );
}

HomeComponent.propTypes = {
  fetchAction: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(menuItemPropType).isRequired,
};

const mapStateToProps = state => ({
  menuItems: state.menu.items,
});

export default connect(mapStateToProps, { fetchAction: fetchMenu })(HomeComponent);
