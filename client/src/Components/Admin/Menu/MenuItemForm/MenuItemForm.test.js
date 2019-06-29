import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import MenuItemForm from './MenuItemForm';
import { menuItemsMock, menuItemsFormMock } from '../../../../tests/mocks';
import { getByLabelAndInput } from '../../../../tests/utils';

let getByLabelText;
let getByText;

let addMenuItem = jest.fn();
let updateMenuItem = jest.fn();

const checkInputs = () => {
  ({ getByLabelText } = render(
    <MenuItemForm
      addMenuItem={addMenuItem}
      updateMenuItem={updateMenuItem}
    />,
  ));
  getByLabelText(new RegExp('Title*'));
  getByLabelText(new RegExp('Price*'));
  getByLabelText(new RegExp('Number*'));
  getByLabelText(new RegExp('Description*'));
};

describe('MenuItemForm without menu item', () => {
  beforeEach(() => {
    ({ getByLabelText, getByText } = render(
      <MenuItemForm
        addMenuItem={addMenuItem}
        updateMenuItem={updateMenuItem}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    addMenuItem = jest.fn();
    updateMenuItem = jest.fn();
  });

  it('Displays Title', () => {
    getByText('Order');
  });

  it('Has inputs', checkInputs);

  it('Calls add item', () => {
    const mockItem = menuItemsMock[0];

    getByLabelAndInput('Title', mockItem.title, getByLabelText);
    getByLabelAndInput('Price', mockItem.price, getByLabelText);
    getByLabelAndInput('Number', mockItem.menuNumber, getByLabelText);
    getByLabelAndInput('Description', mockItem.description, getByLabelText);

    fireEvent.click(getByText('Submit'));
    const submitData = addMenuItem.mock.calls[0][0];
    expect(submitData.title).toBe(mockItem.title);
    expect(parseFloat(submitData.price, 10)).toBe(mockItem.price);
    expect(parseInt(submitData.menuNumber, 10)).toBe(mockItem.menuNumber);
    // Have to remove whitespace to check because multi line
    // inputs add whitespace to the string.
    expect(submitData.description.replace(/\s/g, '')).toBe(mockItem.description.replace(/\s/g, ''));
  });
});

describe('MenuItem with menu item', () => {
  beforeEach(() => {
    ({ getByLabelText, getByText } = render(
      <MenuItemForm
        addMenuItem={addMenuItem}
        updateMenuItem={updateMenuItem}
        menuItem={menuItemsFormMock[0]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    addMenuItem = jest.fn();
    updateMenuItem = jest.fn();
  });

  it('Displays Title', () => {
    getByText('Order');
  });

  it('Calls update item', () => {
    getByLabelAndInput('Title', 'NewTitle', getByLabelText);
    getByLabelAndInput('Price', 2, getByLabelText);
    getByLabelAndInput('Number', 1, getByLabelText);
    getByLabelAndInput('Description', 'New Description', getByLabelText);

    fireEvent.click(getByText('Submit'));
    const submitData = updateMenuItem.mock.calls[0][0];
    expect(submitData.title).toBe('NewTitle');
    expect(submitData.price).toBe('2');
    expect(submitData.menuNumber).toBe('1');
    expect(submitData.description).toBe('New Description');
  });
});
