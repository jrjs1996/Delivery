import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { CreateOrderComponent } from './CreateOrder';
import { menuItemsMock } from '../../../tests/mocks';

const getByLabelAndInput = (label, inputText, getByLabelText) => {
  fireEvent.input(getByLabelText(new RegExp(`${label}*`)), {
    target: { value: inputText },
  });
};

describe('CreateOrder.test', () => {
  let getByText;
  let getByLabelText;
  let getAllByText;

  let createAction = jest.fn();
  let fetchAction = jest.fn();

  beforeEach(() => {
    ({ getByText, getByLabelText, getAllByText } = render(
      <CreateOrderComponent
        createAction={createAction}
        fetchAction={fetchAction}
        menu={menuItemsMock}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    createAction = jest.fn();
    fetchAction = jest.fn();
  });

  it('Calls fetch action', () => {
    expect(fetchAction).toBeCalled();
  });

  it('Inputs work', () => {
    getByLabelAndInput('Customer Name', 'TestName', getByLabelText);
    getByLabelAndInput('Address', 'TestAddress', getByLabelText);
    fireEvent.click(getByLabelText('Delivery'));
    fireEvent.click(getByText('Submit'));
    expect(createAction).toBeCalledWith({
      address: 'TestAddress',
      customerName: 'TestName',
      delivery: false,
      items: [],
      stage: 1,
    });
  });

  it('Submits items that were clicked on.', () => {
    fireEvent.click(getByText(menuItemsMock[0].title));
    fireEvent.click(getByText(menuItemsMock[1].title));
    fireEvent.click(getByText('Submit'));
    expect(createAction).toBeCalledWith({
      address: '',
      customerName: '',
      delivery: true,
      items: ['0', '1'],
      stage: 1,
    });
  });

  it('Remove item works', () => {
    fireEvent.click(getByText(menuItemsMock[0].title));
    fireEvent.click(getByText(menuItemsMock[1].title));
    fireEvent.click(getAllByText(menuItemsMock[0].title)[0]);
    fireEvent.click(getByText('Submit'));
    expect(createAction).toBeCalledWith({
      address: '',
      customerName: '',
      delivery: true,
      items: ['1'],
      stage: 1,
    });
  });
});
