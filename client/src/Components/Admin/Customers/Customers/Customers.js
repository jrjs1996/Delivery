import React, { useEffect } from 'react';
import PropType from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CrudPage from '../../../General/CrudPage';
import CustomerForm from '../CustomerForm/CustomerForm';
import CustomersList from '../CustomersList/CustomerList';
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../../../actions/customerActions';
import { CustomerPropType } from '../../../../propTypes';
import './Customers.css';

const renderCustomerForm = (c, addAction, updateAction) => {
  if (!c) {
    return <CustomerForm onSubmit={addAction} />;
  }
  return (
    <CustomerForm
      addresses={c.addresses}
      email={c.email}
      firstName={c.firstName}
      id={c.id}
      lastName={c.lastName}
      onSubmit={updateAction}
    />
  );
};

const renderCustomerList = (customers, setSelectedCustomer, deleteAction, formPath) => (
  <CustomersList
    customers={customers}
    onDelete={deleteAction}
    onSelect={(id, firstName, lastName, addresses, email) => {
      setSelectedCustomer({
        id,
        firstName,
        lastName,
        addresses,
        email,
      });
    }}
    render={c => <Link className="Link" to={formPath} key={c.props.id}>{c}</Link>}
  />
);

export function CustomersComponent({
  location,
  match,
  customers,
  addAction,
  fetchAction,
  updateAction,
  deleteAction,
}) {
  useEffect(() => {
    fetchAction();
  }, [fetchAction]);
  return (
    <CrudPage
      formPath={`${match.path}form/`}
      items={customers}
      listPath={match.path}
      renderForm={c => renderCustomerForm(c, addAction, updateAction)}
      renderList={(c, setSelectedCustomer) => renderCustomerList(c, setSelectedCustomer, deleteAction, `${match.path}form/`)}
      title="Customers"
      pathName={location.pathname}
    />
  );
}

CustomersComponent.propTypes = {
  /** Location proptype provided by route.
   * Don't provide manually. */
  location: ReactRouterPropTypes.location.isRequired,
  /** Match property provided by route */
  match: ReactRouterPropTypes.match.isRequired,
  /** Customers to populate the list of customers with. */
  customers: PropType.arrayOf(CustomerPropType).isRequired,
  /** Function to be called when the user submits the form to add
   * a customer. */
  addAction: PropType.func.isRequired,
  /** Function to be called when the user submits the form to update
   * a customer. */
  updateAction: PropType.func.isRequired,
  /** Function to be called when the user clicks on a customers delete button. */
  deleteAction: PropType.func.isRequired,
  /** Function that populates customers */
  fetchAction: PropType.func.isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers.items,
});

export default connect(mapStateToProps,
  {
    fetchAction: fetchCustomers,
    addAction: addCustomer,
    updateAction: updateCustomer,
    deleteAction: deleteCustomer,
  })(CustomersComponent);
