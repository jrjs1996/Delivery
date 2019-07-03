import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import OrderItem from './OrderItem';


describe('OrderItem.test', () => {
  let getByText;
  let onClick = jest.fn();
  beforeEach(() => {
    ({ getByText } = render(
      <OrderItem
        title="TestTitle"
        price={32}
        onClick={onClick}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onClick = jest.fn();
  });

  it('Displays title', () => {
    getByText('TestTitle');
  });

  it('Displays price', () => {
    getByText('$32');
  });

  it('Calls onClick', () => {
    fireEvent.click(getByText('TestTitle'));
    expect(onClick).toBeCalled();
  });
});
