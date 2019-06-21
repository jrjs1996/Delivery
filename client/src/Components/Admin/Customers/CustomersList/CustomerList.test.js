import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import CustomerList from './CustomerList';
import { customersMock } from '../../../../tests/mocks';

let getByText;
let getAllByText;

let onSelect = jest.fn();
let onDelete = jest.fn();

describe('CustomerList', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <CustomerList
        customers={customersMock}
        onSelect={onSelect}
        onDelete={onDelete}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onSelect = jest.fn();
    onDelete = jest.fn();
  });

  it('Displays customers', () => {
    getByText(customersMock[0].address);
    getByText(customersMock[1].address);
  });

  it('OnClick is called with correct customer info', () => {
    const customer = customersMock[0];
    fireEvent.click(getByText(customer.address));
    expect(onSelect).toBeCalledWith(
      customer._id,
      customer.firstName,
      customer.lastName,
      customer.address,
      customer.email,
    );
  });

  it('OnDelete is called with correct customer id', () => {
    const customer = customersMock[0];
    fireEvent.click(getAllByText('Delete')[0]);
    expect(onDelete).toBeCalledWith(customer._id);
  });
});

describe('CustomerList without onDelete and onSelect', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <CustomerList
        customers={customersMock}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Doesnt cause error when onSelect isnt provided', () => {
    fireEvent.click(getByText(customersMock[0].address));
  });

  it('Doesnt display delete buttons when onDelete isnt given', () => {
    try {
      getAllByText('Delete');
      throw new Error('Delete buttons found');
    } catch (error) {
      if (error.message === 'Delete buttons found') {
        throw error;
      }
    }
  });
});

describe('CustomerList with RenderItem', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <CustomerList
        customers={customersMock}
        onSelect={onSelect}
        onDelete={onDelete}
        render={c => (
          <div key={`Test ${c.props.id}`}>
            <h1>Render Test</h1>
            {c}
          </div>
        )}
      />,
    ));
  });

  it('Calls render for each item', () => {
    const headers = getAllByText('Render Test');
    expect(headers.length).toBe(2);
  });
});
