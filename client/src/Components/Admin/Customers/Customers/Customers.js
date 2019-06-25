import React, { useState } from 'react';
import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CrudPage from '../../../General/CrudPage';
import CustomerForm from '../CustomerForm/CustomerForm';
import CustomersList from '../CustomersList/CustomerList';
import { locationPropType, CustomerPropType } from '../../../../propTypes';

const renderCustomerForm = (c, addCustomer, updateCustomer) => {
  if (!c) {
    return <CustomerForm onSubmit={addCustomer} />;
  }
  return (
    <CustomerForm
      address={c.address}
      email={c.email}
      firstName={c.firstName}
      id={c._id}
      lastName={c.lastName}
      onSubmit={updateCustomer}
    />
  );
};

const renderCustomerList = (customers, setSelectedCustomer, deleteCustomer, formPath) => (
  <CustomersList
    customers={customers}
    onDelete={deleteCustomer}
    onSelect={(id, firstName, lastName, address, email) => {
      setSelectedCustomer({
        id,
        firstName,
        lastName,
        address,
        email,
      });
    }}
    render={c => <Link to={formPath} key={c.props.id}>{c}</Link>}
  />
);

export function CustomersComponent({
  location,
  customers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  homePath,
}) {
  return (
    <CrudPage
      formPath={`${homePath}form/`}
      items={customers}
      listPath={homePath}
      renderForm={c => renderCustomerForm(c, addCustomer, updateCustomer)}
      renderList={(c, setSelectedCustomer) => {
        return renderCustomerList(c, setSelectedCustomer, deleteCustomer, `${homePath}form/`);
      }}
      title="Customers"
      pathName={location.pathname}
    />
  );
}

CustomersComponent.propTypes = {
  /** Location proptype provided by route.
   * Don't provide manually. */
  location: locationPropType.isRequired,
  /** Customers to populate the list of customers with. */
  customers: PropType.arrayOf(CustomerPropType).isRequired,
  /** Function to be called when the user submits the form to add
   * a customer. */
  addCustomer: PropType.func.isRequired,
  /** Function to be called when the user submits the form to update
   * a customer. */
  updateCustomer: PropType.func.isRequired,
  /** Function to be called when the user clicks on a customers delete button. */
  deleteCustomer: PropType.func.isRequired,
  /** Path to display the page at */
  homePath: PropType.string.isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers.items,
});

export default connect(mapStateToProps, {})(CustomersComponent);
