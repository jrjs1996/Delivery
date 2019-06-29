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
          render={({ location, match }) => {
            return (
              <CustomersComponent
                customers={customersMock}
                addAction={addCustomer}
                updateAction={updateCustomer}
                deleteAction={deleteCustomer}
                location={location}
                match={match}
                homePath="/"
                fetchAction={() => {}}
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
});

describe('Customers', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router initialEntries={['/form/']} initialIndex={0}>
        <Route
          path="/"
          render={({ location, match }) => {
            return (
              <CustomersComponent
                customers={customersMock}
                addAction={addCustomer}
                updateAction={updateCustomer}
                deleteAction={deleteCustomer}
                homePath="/"
                location={location}
                match={match}
                fetchAction={() => {}}
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
});
