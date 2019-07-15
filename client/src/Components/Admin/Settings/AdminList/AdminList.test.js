import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { adminsMock } from '../../../../tests/mocks';
import AdminList from './AdminList';

describe('AdminList', () => {
  let getByText;
  let container;

  let createAction = jest.fn();
  let fetchAction = jest.fn();
  let updateAction = jest.fn();

  beforeEach(() => {
    ({ getByText, container } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route
          path="/"
          render={props => (
            <AdminList
              admins={adminsMock}
              createAction={createAction}
              fetchAction={fetchAction}
              updateAction={updateAction}
              {...props}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
    createAction = jest.fn();
    fetchAction = jest.fn();
    updateAction = jest.fn();
  });

  it('Shows list of admins initialluy', () => {
    getByText('Edit Admins');
    getByText(adminsMock[1].username);
    getByText(adminsMock[1].username);
  });

  it('Goes to update admin when an admin is clicked on', () => {
    fireEvent.click(getByText(adminsMock[0].username));
    getByText(new RegExp('Update Admin*'));
  });

  it('Goes to add admin when add button is clicked on', () => {
    fireEvent.click(container.querySelector('#addButton'));
    getByText('Add Admin');
  });
});
