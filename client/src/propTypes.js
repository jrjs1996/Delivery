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
