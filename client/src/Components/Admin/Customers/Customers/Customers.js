import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../../../actions/customerActions';
import { CustomerPropType } from '../../../../propTypes';

import CrudPage from '../../../General/CrudPage/CrudPage';
import CustomerForm from '../CustomerForm/CustomerForm';
import CustomersList from '../CustomersList/CustomerList';

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
        try {
          updateAction(data);
          return 'Customer Updated';
        } catch (error) {
          return '';
        }
      }}
    />
  );
};

const renderCustomerList = (customers, setSelectedCustomer, deleteAction, formPath) => (
  <CustomersList
    customers={customers}
    onDelete={deleteAction}
    onSelect={setSelectedCustomer}
    render={c => (
      <Link className="Link" to={formPath} key={c.props.id}>
        {c}
      </Link>
    )}
  />
);

export function CustomersComponent({
  addAction,
  customers,
  deleteAction,
  fetchAction,
  history,
  location,
  match,
  updateAction,
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
      renderForm={(c) => {
        return renderCustomerForm(c, addAction, updateAction, match.path, history, setMessage);
      }}
      renderList={(c, setSelectedCustomer) => renderCustomerList(c, setSelectedCustomer, deleteAction, `${match.path}form/`)
      }
      title="Customers"
      pathName={location.pathname}
    />
  );
}

CustomersComponent.propTypes = {
  /** Function to be called when the user submits the form to add
   * a customer. */
  addAction: PropTypes.func.isRequired,
  /** Customers to populate the list of customers with. */
  customers: PropTypes.arrayOf(CustomerPropType).isRequired,
  /** Function to be called when the user clicks on a customers delete button. */
  deleteAction: PropTypes.func.isRequired,
  /** Function that populates customers */
  fetchAction: PropTypes.func.isRequired,
  /** History provided by route. */
  history: ReactRouterPropTypes.history.isRequired,
  /** Location proptype provided by route.
   * Don't provide manually. */
  location: ReactRouterPropTypes.location.isRequired,
  /** Match property provided by route */
  match: ReactRouterPropTypes.match.isRequired,
  /** Function to be called when the user submits the form to update
   * a customer. */
  updateAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers.items,
});

export default connect(
  mapStateToProps,
  {
    addAction: addCustomer,
    deleteAction: deleteCustomer,
    fetchAction: fetchCustomers,
    updateAction: updateCustomer,
  },
)(CustomersComponent);
