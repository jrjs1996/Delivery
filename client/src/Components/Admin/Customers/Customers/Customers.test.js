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
          render={({ history, location, match }) => (
            <CustomersComponent
              addAction={addCustomer}
              customers={customersMock}
              deleteAction={deleteCustomer}
              fetchAction={() => {}}
              history={history}
              homePath="/"
              location={location}
              match={match}
              updateAction={updateCustomer}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    addCustomer = jest.fn();
    updateCustomer = jest.fn();
    deleteCustomer = jest.fn();
  });

  it('Displays list', () => {
    getByText(customersMock[0].email);
    getByText(customersMock[1].email);
  });

  it('Goes to form when a customer in the list is clicked on.', () => {
    fireEvent.click(getByText(customersMock[0].email));
    getByText('Submit');
  });

  it('Calls update action after clicking on customer, then submitting form', () => {
    fireEvent.click(getByText('johnD@email.com'));
    fireEvent.click(getByText('Submit'));
    expect(updateCustomer).toBeCalled();
  });
});

describe('Customers', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router initialEntries={['/form/']} initialIndex={0}>
        <Route
          path="/"
          render={({ location, match, history }) => (
            <CustomersComponent
              addAction={addCustomer}
              customers={customersMock}
              deleteAction={deleteCustomer}
              fetchAction={() => {}}
              history={history}
              location={location}
              match={match}
              updateAction={updateCustomer}
            />
          )}
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

  it('Calls add customer when on form without customer', () => {
    fireEvent.click(getByText('Submit'));
    expect(addCustomer).toBeCalled();
  });
});
