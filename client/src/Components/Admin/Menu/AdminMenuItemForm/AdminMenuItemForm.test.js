import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { AdminMenuItemFormComponent } from './AdminMenuItemForm';
import { menuItemsMock } from '../../../../tests/mocks';

let getByLabelText;
let getByText;

let addMenuItem = jest.fn();
let updateMenuItem = jest.fn();

const getByLabelAndInput = (label, inputText) => {
  fireEvent.input(getByLabelText(new RegExp(`${label}*`)), { target: { value: inputText } });
};

const checkInputs = () => {
  ({ getByLabelText } = render(
    <AdminMenuItemFormComponent
      addMenuItem={addMenuItem}
      updateMenuItem={updateMenuItem}
    />,
  ));
  getByLabelText(new RegExp('Title*'));
  getByLabelText(new RegExp('Price*'));
  getByLabelText(new RegExp('Number*'));
  getByLabelText(new RegExp('Description*'));
};

describe('AdminMenuItemForm without menu item', () => {
  beforeEach(() => {
    ({ getByLabelText, getByText } = render(
      <AdminMenuItemFormComponent
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

    getByLabelAndInput('Title', mockItem.title);
    getByLabelAndInput('Price', mockItem.price);
    getByLabelAndInput('Number', mockItem.menuNumber);
    getByLabelAndInput('Description', mockItem.description);

    fireEvent.click(getByText('Submit'));
    const submitData = addMenuItem.mock.calls[0][0];
    expect(submitData.title).toBe(mockItem.title);
    expect(submitData.price).toBe(mockItem.price);
    expect(submitData.menuNumber).toBe(mockItem.menuNumber);
    // Have to remove whitespace to check because multi line
    // inputs add whitespace to the string.
    expect(submitData.description.replace(/\s/g, '')).toBe(mockItem.description.replace(/\s/g, ''));
  });
});

describe('AdminMenuItem with menu item', () => {
  beforeEach(() => {
    ({ getByLabelText, getByText } = render(
      <AdminMenuItemFormComponent
        addMenuItem={addMenuItem}
        updateMenuItem={updateMenuItem}
        menuItem={menuItemsMock[0]}
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
    getByLabelAndInput('Title', 'NewTitle');
    getByLabelAndInput('Price', '2');
    getByLabelAndInput('Number', '1');
    getByLabelAndInput('Description', 'New Description');

    fireEvent.click(getByText('Submit'));
    const submitData = updateMenuItem.mock.calls[0][0];
    expect(submitData.title).toBe('NewTitle');
    expect(submitData.price).toBe('2');
    expect(submitData.menuNumber).toBe('1');
    expect(submitData.description).toBe('New Description');
  });
});
