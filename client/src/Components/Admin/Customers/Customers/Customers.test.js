import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { CustomersComponent } from './Customers';
import { customersMock } from '../../../../tests/mocks';

let getByText;
let getAllByText;
let addCustomer = jest.fn();
let updateCustomer = jest.fn();
let deleteCustomer = jest.fn();

describe('Customers', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route
          path="/"
          render={({ location }) => {
            return (
              <CustomersComponent
                customers={customersMock}
                addCustomer={addCustomer}
                updateCustomer={updateCustomer}
                deleteCustomer={deleteCustomer}
                location={location}
                homePath="/"
              />
            );
          }}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays list', () => {
    getByText('johnD@email.com');
    getByText('Bobby@email.com');
  });

  it('Goes to form when a customer in the list is clicked on.', () => {
    fireEvent.click(getByText('johnD@email.com'));
    getByText('Submit');
  });

  it('Calls update customer when accessing form with existing customer', () => {
    fireEvent.click(getByText('johnD@email.com'));
    fireEvent.click(getByText('Submit'));
    expect(updateCustomer).toBeCalled();
  });

  it('Calls deleteCustomer when a customers delete button is clicked on', () => {
    fireEvent.click(getAllByText('Delete')[0]);
    expect(deleteCustomer).toBeCalled();
  });
});

describe('Customers', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router initialEntries={['/form/']} initialIndex={0}>
        <Route
          path="/"
          render={({ location }) => {
            return (
              <CustomersComponent
                customers={customersMock}
                addCustomer={addCustomer}
                updateCustomer={updateCustomer}
                deleteCustomer={deleteCustomer}
                homePath="/"
                location={location}
              />
            );
          }}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders form when at form path', () => {
    getByText('Submit');
  });

  it('Calls addCustomer when accessing form without customer', () => {
    fireEvent.click(getByText('Submit'));
    expect(addCustomer).toBeCalled();
  });
});
