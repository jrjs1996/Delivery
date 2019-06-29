import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import CustomerForm from './CustomerForm';
import { customersMock } from '../../../../tests/mocks';
import { getByLabelAndInput } from '../../../../tests/utils';

let getByText;
let getByLabelText;

let onSubmit = jest.fn();

const customer = customersMock[0];

describe('CustomerForm', () => {
  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <CustomerForm
        onSubmit={onSubmit}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onSubmit = jest.fn();
  });

  it('Displays title', () => {
    getByText('Add Customer');
  });

  it('Has First Name input', () => {
    getByLabelText(RegExp('First Name*'));
  });

  it('Has Last Name input', () => {
    getByLabelText(RegExp('Last Name*'));
  });

  it('Has Email input', () => {
    getByLabelText(RegExp('Email*'));
  });

  it('Has submit button', () => {
    getByText('Submit');
  });

  it('Submit sends correct data', () => {

    getByLabelAndInput('First Name', customer.firstName, getByLabelText);
    getByLabelAndInput('Last Name', customer.lastName, getByLabelText);
    getByLabelAndInput('Email', customer.email, getByLabelText);

    fireEvent.click((getByText('Submit')));

    const submitObject = onSubmit.mock.calls[0][0];
    expect(submitObject.firstName).toBe(customer.firstName);
    expect(submitObject.lastName).toBe(customer.lastName);
    expect(submitObject.email).toBe(customer.email);
    expect(submitObject._id).toBe(undefined);
  });
});

describe('CustomerForm with user info initialized', () => {
  beforeEach(() => {
    ({ getByText, getByLabelText } = render(
      <CustomerForm
        email={customer.email}
        firstName={customer.firstName}
        id={customer._id}
        lastName={customer.lastName}
        onSubmit={onSubmit}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Has correct title', () => {
    getByText('Update Customer');
  });

  it('Fills input values with user info', () => {
    expect(getByLabelText(RegExp('First Name*')).value).toBe(customer.firstName);
    expect(getByLabelText(RegExp('Last Name*')).value).toBe(customer.lastName);
    expect(getByLabelText(RegExp('Email*')).value).toBe(customer.email);
  });

  it('Sends new info with id', () => {
    getByLabelAndInput('First Name', 'newFirstName', getByLabelText);
    getByLabelAndInput('Last Name', 'newLastName', getByLabelText);
    getByLabelAndInput('Email', 'newEmail', getByLabelText);

    fireEvent.click((getByText('Submit')));

    const submitObject = onSubmit.mock.calls[0][0];
    expect(submitObject.firstName).toBe('newFirstName');
    expect(submitObject.lastName).toBe('newLastName');
    expect(submitObject.email).toBe('newEmail');
    expect(submitObject._id).toBe(customer._id);
  });
});
