import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { AdminMenuComponent } from './AdminMenu';
import { menuItemsMock } from '../../../../tests/mocks';

let getByText;
let getAllByText;

let fetchAction = jest.fn();
let addAction = jest.fn();
let updateAction = jest.fn();
let deleteAction = jest.fn();
let uploadImage = jest.fn();

describe('AdminMenu list', () => {
  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router initialEntries={['/']}>
        <Route
          path="/"
          render={props => (
            <AdminMenuComponent
              fetchAction={fetchAction}
              addAction={addAction}
              updateAction={updateAction}
              deleteAction={deleteAction}
              uploadImage={uploadImage}
              items={menuItemsMock}
              {...props}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    fetchAction = jest.fn();
    addAction = jest.fn();
    updateAction = jest.fn();
    deleteAction = jest.fn();
    uploadImage = jest.fn();
  });

  it('Calls fetch action', () => {
    expect(fetchAction).toBeCalled();
  });

  it('Renders list', () => {
    getByText(menuItemsMock[0].title);
    getByText(menuItemsMock[1].title);
  });

  it('Calls delete when a delete button is clicked on', () => {
    fireEvent.click(getAllByText('Delete')[0]);
    expect(deleteAction).toBeCalled();
  });

  it('Calls update action after navigating to for by clicking on an item and submitting', () => {
    fireEvent.click(getByText(menuItemsMock[0].title));
    fireEvent.click(getByText('Submit'));
    expect(updateAction).toBeCalled();
  });
});

describe('AdminMenu form', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/form/']}>
        <Route
          path="/"
          render={props => (
            <AdminMenuComponent
              fetchAction={fetchAction}
              addAction={addAction}
              updateAction={updateAction}
              deleteAction={deleteAction}
              uploadImage={uploadImage}
              items={menuItemsMock}
              {...props}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    fetchAction = jest.fn();
    addAction = jest.fn();
    updateAction = jest.fn();
    deleteAction = jest.fn();
    uploadImage = jest.fn();
  });

  it('Renders form', () => {
    getByText('Submit');
  });

  it('Calls add action when submit is clicked', () => {
    fireEvent.click(getByText('Submit'));
    expect(addAction).toBeCalled();
  });
});
