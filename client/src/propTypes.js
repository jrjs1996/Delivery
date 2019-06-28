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
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
});

/** Location provided by routes (react router) */
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
  menuNumber: PropTypes.string,
  price: PropTypes.string,
  revision: PropTypes.string,
  title: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});

/** Match provided by routes (react router)  */
export const matchPropType = PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
