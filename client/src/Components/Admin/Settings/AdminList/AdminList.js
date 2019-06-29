import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { AdminPropType } from '../../../../propTypes';
import { fetchAdmins } from '../../../../actions/adminActions';
import SettingList from '../SettingList/SettingList';


function AdminList({ admins, fetchAdmins: fetchAction }) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <SettingList
      onClick={() => {}}
      items={admins}
      itemString={a => a.username}
      title="Edit Admins"
    />
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
export default connect(mapStateToProps, { fetchAdmins })(AdminList);
