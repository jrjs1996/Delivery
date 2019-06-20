import React from 'react';
import { create } from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { AdminMenuItemListComponent } from './AdminMenuItemList';
import { menuItemsMock } from '../../../../tests/mocks';

describe('AdminMenuItemList', () => {
  let getByText;
  let getAllByText;
  let rerender;

  let onSelect = jest.fn();
  let onDelete = jest.fn();
  let menu = [];

  beforeEach(() => {
    onSelect = jest.fn();
    onDelete = jest.fn();
    menu = [];

    ({ getByText, getAllByText, rerender } = render(
      <Router>
        <AdminMenuItemListComponent
          onSelect={onSelect}
          onDelete={onDelete}
          fetchMenu={() => { menu = menuItemsMock; }}
          menu={menu}
        />
      </Router>
      ,
    ));
    ({ getByText, getAllByText, rerender } = render(
      <Router>
        <AdminMenuItemListComponent
          onSelect={onSelect}
          onDelete={onDelete}
          fetchMenu={() => { menu = menuItemsMock; }}
          menu={menu}
        />
      </Router>
      ,
    ));
  });

  afterEach(() => {
    cleanup();
    onSelect = jest.fn();
    onDelete = jest.fn();
    menu = [];
  });

  it('Displays items', () => {
    getByText('Hamburger');
    getByText('Salad');
  });

  it('Items can be selected', () => {
    fireEvent.click(getAllByText('Hamburger')[0]);
    expect(onSelect.mock.calls[0][0].title).toBe('Hamburger');
    fireEvent.click(getByText('Salad'));
    expect(onSelect.mock.calls[1][0].title).toBe('Salad');
  });

  it('Items can be deleted', () => {
    const deletes = getAllByText('Delete');
    fireEvent.click(deletes[0]);
    expect(onDelete).toBeCalledWith(menuItemsMock[0].menuNumber);
    fireEvent.click(deletes[1]);
    expect(onDelete).toBeCalledWith(menuItemsMock[1].menuNumber);
  });

  it('Works without onSelect and fetchMenu', () => {
    cleanup();
    ({ getByText, getAllByText, rerender } = render(
      <Router>
        <AdminMenuItemListComponent
          onDelete={onDelete}
          menu={menu}
        />
      </Router>
      ,
    ));
    fireEvent.click(getAllByText('Hamburger')[0]);
  });
});
