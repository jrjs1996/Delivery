import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Order from './Order';
import { menuItemsMock } from '../../../../tests/mocks';


describe('Order.test', () => {
  let getByText;

  let updateAction = jest.fn();

  const jsx = (
    <Order
      address="TestAddress"
      customerName="TestCustomerName"
      delivery
      id="TestId"
      items={menuItemsMock}
      orderCreated="TestOrderCreated"
      stage={0}
      updateAction={updateAction}
    />
  );

  beforeEach(() => {
    ({ getByText } = render((
      <Order
        address="TestAddress"
        customerName="TestCustomerName"
        delivery
        id="TestId"
        items={menuItemsMock}
        orderCreated="TestOrderCreated"
        stage={0}
        updateAction={updateAction}
      />
    )));
  });

  afterEach(() => {
    cleanup();
    updateAction = jest.fn();
  });

  it('Displays address', () => {
    getByText('TestAddress');
  });

  it('Displays customerName', () => {
    getByText('TestCustomerName');
  });

  it('Display sorder created', () => {
    getByText('TestOrderCreated');
  });

  it('Displays order items when clicked', () => {
    fireEvent.click(getByText('TestCustomerName'));
    ({ getByText } = render(jsx));
    getByText(menuItemsMock[0].title);
    getByText(menuItemsMock[1].title);
  });

  it('Calls update action with id and new stage', () => {
    fireEvent.click(getByText('Next'));
    expect(updateAction).toBeCalledWith('TestId', { stage: 1 });
  });
});

describe('Order.test', () => {
  let getByText;

  let updateAction = jest.fn();

  const jsx = (
    <Order
      address="TestAddress"
      customerName="TestCustomerName"
      delivery={false}
      id="TestId"
      items={menuItemsMock}
      orderCreated="TestOrderCreated"
      stage={0}
      updateAction={updateAction}
    />
  );

  beforeEach(() => {
    ({ getByText } = render(jsx));
  });

  afterEach(() => {
    cleanup();
    updateAction = jest.fn();
  });

  it('Renders when delivery is false.', () => {
    getByText('TestAddress');
  });
});
