import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

const renderCustomerForm = (c, addAction, updateAction, listPath, history, setMessage) => {
  setMessage(null);
  if (!c) {
    return (
      <CustomerForm
        onSubmit={(data) => {
          addAction(data);
          setMessage('Customer Added');
          history.push(listPath);
        }}
      />
    );
  }
  return (
    <CustomerForm
      addresses={c.addresses}
      email={c.email}
      firstName={c.firstName}
      id={c._id}
      lastName={c.lastName}
      onSubmit={(data) => {
        updateAction(data);
        return 'Customer Updated';
      }}
    />
  );
};

const renderCustomerList = (customers, setSelectedCustomer, deleteAction, formPath) => (
  <CustomersList
    customers={customers}
    onDelete={deleteAction}
    onSelect={setSelectedCustomer}
    render={c => <Link className="Link" to={formPath} key={c.props.id}>{c}</Link>}
  />
);

export function CustomersComponent({
  history, 
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

  const [message, setMessage] = useState(null);
  
  return (
    <CrudPage
      className="Customers"
      formPath={`${match.path}form/`}
      items={customers}
      listPath={match.path}
      message={message}
      renderForm={c => renderCustomerForm(c, addAction, updateAction, match.path, history, setMessage)}
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
  customers: PropTypes.arrayOf(CustomerPropType).isRequired,
  /** Function to be called when the user submits the form to add
   * a customer. */
  addAction: PropTypes.func.isRequired,
  /** Function to be called when the user submits the form to update
   * a customer. */
  updateAction: PropTypes.func.isRequired,
  /** Function to be called when the user clicks on a customers delete button. */
  deleteAction: PropTypes.func.isRequired,
  /** Function that populates customers */
  fetchAction: PropTypes.func.isRequired,
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
