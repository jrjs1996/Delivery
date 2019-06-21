import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent, getByLabelText } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Customer from './Customer';
import { customersMock } from '../../../../../tests/mocks';

const customer = customersMock[0];

let getByText;
let onSelect = jest.fn();
let onDelete = jest.fn();

describe('Customer', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Customer
        firstName={customer.firstName}
        lastName={customer.lastName}
        address={customer.address}
        email={customer.email}
        id={customer._id}
        onSelect={onSelect}
        onDelete={onDelete}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  // Check if info is displayed
  it('Displays name', () => {
    getByText(`${customer.firstName} ${customer.lastName}`);
  });
  it('Displays Address', () => {
    getByText(customer.address);
  });
  it('Displays email', () => {
    getByText(customer.email);
  });

  // Check functions
  it('OnSelect works', () => {
    fireEvent.click(getByText(customer.address));
    expect(onSelect).toBeCalledWith(
      customer._id,
      customer.firstName,
      customer.lastName,
      customer.address,
      customer.email,
    );
  });
  it('OnDelete works', () => {
    fireEvent.click(getByText('Delete'));
    expect(onDelete).toBeCalledWith(customer._id);
  });
});

describe('Customer without function props', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Customer
        firstName={customer.firstName}
        lastName={customer.lastName}
        address={customer.address}
        email={customer.email}
        id={customer._id}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Doesnt throw error on click', () => {
    fireEvent.click(getByText(customer.address));
  });
  it('Doesnt display delete button', () => {
    try {
      getByText('Delete');
      throw new Error('Delete Exists');
    } catch (error) {
      if (error.message === 'Delete Exists') {
        throw error;
      }
    }
  });
});
