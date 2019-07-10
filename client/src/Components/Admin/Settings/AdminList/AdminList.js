import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import AdminForm from './AdminForm/AdminForm';
import { AdminPropType } from '../../../../propTypes';
import SettingList from '../../../General/SettingList/SettingList';

export default function AdminList({
  admins,
  createAction,
  fetchAction,
  history,
  match,
  updateAction,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <div>
      <Route
        path={match.path}
        exact
        render={() => (
          <SettingList
            onAdd={() => {
              setSelectedAdmin(null);
              history.push(`${match.path}/form/`);
            }}
            onClick={(a) => {
              setSelectedAdmin(a);
              history.push(`${match.path}/form/`);
            }}
            items={admins}
            itemString={a => a.username}
            title="Edit Admins"
          />
        )}
      />
      <Route
        path={`${match.path}/form/`}
        render={() => {
          if (!selectedAdmin) {
            return <AdminForm onSubmit={createAction} />;
          }
          return (
            <AdminForm
              username={selectedAdmin.username}
              id={selectedAdmin._id}
              onSubmit={updateAction}
            />
          );
        }}
      />
    </div>
  );
}

AdminList.propTypes = {
  /** Admin objects to populate the list with. */
  admins: PropTypes.arrayOf(AdminPropType).isRequired,
  /** Action to create an admin. */
  createAction: PropTypes.func.isRequired,
  /** Action to call which fetches admins. */
  fetchAction: PropTypes.func.isRequired,
  /** Router history */
  history: ReactRouterPropTypes.history.isRequired,
  /** Match provided by route */
  match: ReactRouterPropTypes.match.isRequired,
  /** Action to update an order */
  updateAction: PropTypes.func.isRequired,
};
