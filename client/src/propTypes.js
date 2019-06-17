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
