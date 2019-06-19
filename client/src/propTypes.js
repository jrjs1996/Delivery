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

export const locationPropType = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.any,
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
