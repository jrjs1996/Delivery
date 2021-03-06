import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer/Customer';
import { CustomerPropType } from '../../../../propTypes';

export default function CustomerList({
  customers,
  onDelete,
  onSelect,
  render,
}) {
  const customerItems = Object.entries(customers).map(([, c], i) => {
    const customer = (
      <Customer
        addresses={c.addresses}
        email={c.email}
        firstName={c.firstName}
        id={c._id}
        index={i}
        key={c._id}
        lastName={c.lastName}
        onDelete={onDelete}
        onSelect={onSelect}
      />
    );
    if (render) {
      return render(customer);
    }
    return customer;
  });

  return (
    <div className="CustomerList">
      {customerItems}
    </div>
  );
}

CustomerList.propTypes = {
  /** List of customers to be displayed */
  customers: PropTypes.arrayOf(CustomerPropType).isRequired,
  /** Function to be called when the delete button on a
   * customer is clicked. */
  onDelete: PropTypes.func,
  /** Function to be called when a customer is clicked on */
  onSelect: PropTypes.func,
  /** Function to render each customer. e.g to wrap in links. */
  render: PropTypes.func,
};

CustomerList.defaultProps = {
  onDelete: null,
  onSelect: () => {},
  render: null,
};
