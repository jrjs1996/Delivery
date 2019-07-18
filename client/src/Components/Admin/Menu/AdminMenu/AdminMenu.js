import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  addMenuItem,
  deleteMenuItem,
  fetchMenu,
  updateMenuItem,
  uploadMenuItemImage,
} from '../../../../actions/menu/menu';
import { MenuItemPropType } from '../../../../propTypes';

import CrudPage from '../../../General/CrudPage/CrudPage';
import MenuItemForm from '../MenuItemForm/MenuItemForm';
import MenuItemList from '../../../General/MenuItemList/MenuItemList';
import './AdminMenu.css';

const renderItemForm = (i, addAction, updateAction, uploadImage, listPath, history, setMessage) => {
  setMessage(null);
  if (!i) {
    return (
      <MenuItemForm onSubmit={(data) => {
        addAction(data);
        setMessage('Item Added');
        history.push(listPath);
      }}
      />
    );
  }

  return (
    <MenuItemForm
      title={i.title}
      price={i.price}
      id={i._id}
      menuNumber={i.menuNumber}
      description={i.description}
      onSubmit={(data) => {
        updateAction(data);
        return 'Item Updated';
      }}
      image={i.image}
      uploadImage={uploadImage}
    />
  );
};

const renderItemList = (items, setSelectedItem, deleteAction, formPath) => (
  <MenuItemList
    imageMode="always"
    menu={items}
    onSelect={setSelectedItem}
    onDelete={deleteAction}
    className="MenuItemList"
    render={i => (
      <Link className="Link" to={formPath} key={i.props._id}>
        {i}
      </Link>
    )}
  />
);

export function AdminMenuComponent({
  addAction,
  deleteAction,
  fetchAction,
  history,
  items,
  location,
  match,
  updateAction,
  uploadImage,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);
  const [message, setMessage] = useState(null);

  return (
    <CrudPage
      className="AdminMenu"
      formPath={`${match.path}form/`}
      items={items}
      listPath={match.path}
      message={message}
      pathName={location.pathname}
      renderForm={i => renderItemForm(i, addAction, updateAction, uploadImage, match.path, history, setMessage)}
      renderList={(i, setSelectedItem) => renderItemList(i, setSelectedItem, deleteAction, `${match.path}form/`)
      }
      title="Menu"
    />
  );
}

AdminMenuComponent.propTypes = {
  /** Function to be called when the user submits the form to add
   * an item. */
  addAction: PropTypes.func.isRequired,
  /** Function to be called when the user clicks on a menu items delete button. */
  deleteAction: PropTypes.func.isRequired,
  /** Function that populates items */
  fetchAction: PropTypes.func.isRequired,
  /** History property provided by route */
  history: ReactRouterPropTypes.history.isRequired,
  /** Items to populate the list of menu with. */
  items: PropTypes.arrayOf(MenuItemPropType).isRequired,
  /** Location proptype provided by route.
   * Don't provide manually. */
  location: ReactRouterPropTypes.location.isRequired,
  /** Match property provided by route */
  match: ReactRouterPropTypes.location.isRequired,
  /** Function to be called when the user submits the form to update
   * an item. */
  updateAction: PropTypes.func.isRequired,
  /** Function to call to upload a menu item image */
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.menu.items,
});

export default connect(
  mapStateToProps,
  {
    addAction: addMenuItem,
    deleteAction: deleteMenuItem,
    fetchAction: fetchMenu,
    updateAction: updateMenuItem,
    uploadImage: uploadMenuItemImage,
  },
)(AdminMenuComponent);
