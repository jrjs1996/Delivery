import PropTypes from 'prop-types';

export const AdminPropType = PropTypes.shape({
  username: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});

export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);

export const CustomerPropType = PropTypes.shape({
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.string.isRequired),
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
});

export const menuItemPropType = PropTypes.shape({
  archived: PropTypes.bool,
  created: PropTypes.string,
  description: PropTypes.string,
  menuNumber: PropTypes.number,
  price: PropTypes.number,
  revision: PropTypes.number,
  title: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});

export const menuItemFormPropType = PropTypes.shape({
  archived: PropTypes.bool,
  created: PropTypes.string,
  description: PropTypes.string,
  menuNumber: PropTypes.string,
  price: PropTypes.string,
  revision: PropTypes.number,
  title: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});

export const orderPropType = PropTypes.shape({
  customer: PropTypes.string,
  stage: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  orderCreated: PropTypes.string.isRequired,
  orderCompleted: PropTypes.string,
  delivery: PropTypes.bool.isRequired,
  customerName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(menuItemPropType),
});
