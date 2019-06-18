import React, { useEffect } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Card, Grid, Typography } from '@material-ui/core';
import { AdminPropType } from '../../../../propTypes';
import { fetchAdmins } from '../../../../actions/adminActions';
import AdminListItem from './AdminListItem';


function AdminList({ admins, fetchAdmins: fetchAction }) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);

  return (
    <Card style={{ paddingTop: '1%', paddingBottom: '2%' }}>
      <Typography variant="h4" gutterBottom>
        Edit admins
      </Typography>
      <Grid container spacing={1}>
        { admins.map(a => <AdminListItem admin={a} />) }
      </Grid>
    </Card>
  );
}

AdminList.propTypes = {
  admins: PropType.arrayOf(AdminPropType).isRequired,
  fetchAdmins: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  admins: state.admins.admins,
});

export default connect(mapStateToProps, { fetchAdmins })(AdminList);
