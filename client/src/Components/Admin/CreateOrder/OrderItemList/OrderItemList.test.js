import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import OrderItemList from './OrderItemList';
import { menuItemsMock } from '../../../../tests/mocks';


describe('OrderItemList.test', () => {
  let getByText;
  let onClick = jest.fn();

  beforeEach(() => {
    ({ getByText } = render(
      <OrderItemList
        orderItems={menuItemsMock}
        onClick={onClick}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onClick = jest.fn();
  });

  it('Displays items', () => {
    getByText(menuItemsMock[0].title);
    getByText(menuItemsMock[1].title);
  });

  it('OnClick is called with correct index', () => {
    fireEvent.click(getByText(menuItemsMock[1].title));
    expect(onClick).toBeCalledWith(1);
  });
});
