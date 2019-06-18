import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthed } from '../../utils/token';

export default function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const authInfo = isAuthed();
        return (authInfo.tokenInfo && authInfo.isAdmin) ? (
          <Component {...props} authedId={authInfo.tokenInfo} />
        ) : (
          <Redirect
            to={{
              pathname: '/login/',
            }}
          />
        );
      }}
    />
  );
}

AdminRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
