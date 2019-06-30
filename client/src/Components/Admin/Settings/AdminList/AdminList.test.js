import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { AdminListComponent } from './AdminList';

describe('AdminList', () => {
  let admins = [];

  const store = [
    { username: 'First User', __v: 0, _id: '0' },
    { username: 'Second User', __v: 0, _id: '1' },
    { username: 'Third User', __v: 0, _id: '2' },
  ];

  const fetchAdmins = () => {
    admins = store;
  };

  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route
          path="/"
          render={props => (
            <AdminListComponent
              admins={admins}
              fetchAdmins={fetchAdmins}
              {...props}
            />
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    admins = [];
    cleanup();
  });

  it('Updates admins', () => {
    expect(admins).toBe(store);
  });

  it('Displays the items', () => {
    ({ getByText } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route
          path="/"
          render={props => (
            <AdminListComponent
              admins={admins}
              fetchAdmins={fetchAdmins}
              {...props}
            />
          )}
        />
      </Router>,
    ));
    getByText('First User');
    getByText('Second User');
    getByText('Third User');
  });
});
