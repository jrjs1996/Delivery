import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import AdminForm from './AdminForm/AdminForm';
import { AdminPropType } from '../../../../propTypes';
import { fetchAdmins, createAdmin, updateAdmin } from '../../../../actions/adminActions';
import SettingList from '../SettingList/SettingList';

function AdminList({
  admins,
  fetchAction,
  updateAction,
  createAction,
  match,
  history
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
  admins: PropType.arrayOf(AdminPropType).isRequired,
  /** Action to call which fetches admins. */
  fetchAdmins: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  admins: state.admins.admins,
});

export { AdminList as AdminListComponent };
export default connect(mapStateToProps, { fetchAction: fetchAdmins, updateAction: updateAdmin, createAction: createAdmin })(AdminList);
