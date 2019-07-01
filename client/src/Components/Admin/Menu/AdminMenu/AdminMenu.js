import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import MenuItemForm from '../MenuItemForm/MenuItemForm';
import {
  fetchMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../../../../actions/menuActions';
import { menuItemPropType } from '../../../../propTypes';
import CrudPage from '../../../General/CrudPage';
import MenuItemList from '../MenuItemList/MenuItemList';
import './AdminMenu.css';

const renderItemForm = (i, addAction, updateAction) => {
  if (!i) {
    return <MenuItemForm onSubmit={addAction} />;
  }
  console.log(i)
  return (
    <MenuItemForm
      title={i.title}
      price={i.price}
      id={i._id}
      menuNumber={i.menuNumber}
      description={i.menuItem}
      onSubmit={updateAction}
      image={i.image}
    />
  );
};

const renderItemList = (items, setSelectedItem, deleteAction, formPath) => (
  <MenuItemList
    image
    menu={items}
    onSelect={setSelectedItem}
    onDelete={deleteAction}
    className="MenuItemList"
    render={i => <Link className="Link" to={formPath} key={i.props._id}>{i}</Link>}
  />
);

function AdminMenu({
  location,
  match,
  items,
  addAction,
  fetchAction,
  updateAction,
  deleteAction,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <CrudPage
      formPath={`${match.path}form/`}
      items={items}
      listPath={match.path}
      renderForm={i => renderItemForm(i, addAction, updateAction)}
      renderList={(i, setSelectedItem) => renderItemList(i, setSelectedItem, deleteAction, `${match.path}form/`)}
      title="Menu"
      pathName={location.pathname}
    />
  );
}

AdminMenu.propTypes = {
  /** Location proptype provided by route.
   * Don't provide manually. */
  location: ReactRouterPropTypes.location.isRequired,
  /** Match property provided by route */
  match: ReactRouterPropTypes.location.isRequired,
  /** Items to populate the list of menu with. */
  items: PropType.arrayOf(menuItemPropType).isRequired,
  /** Function to be called when the user submits the form to add
   * an item. */
  addAction: PropType.func.isRequired,
  /** Function to be called when the user submits the form to update
   * an item. */
  updateAction: PropType.func.isRequired,
  /** Function to be called when the user clicks on a menu items delete button. */
  deleteAction: PropType.func.isRequired,
  /** Function that populates items */
  fetchAction: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.menu.items,
});

export default connect(mapStateToProps,
  {
    fetchAction: fetchMenu,
    addAction: addMenuItem,
    updateAction: updateMenuItem,
    deleteAction: deleteMenuItem,
  })(AdminMenu);
