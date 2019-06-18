import React from 'react';
import { render } from '@testing-library/react';
import 'jest-dom/extend-expect';
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
      <AdminListComponent
        admins={admins}
        fetchAdmins={fetchAdmins}
      />,
    ));
  });

  afterEach(() => {
    admins = [];
  });

  it('Updates admins', () => {
    expect(admins).toBe(store);
  });

  it('Displays the items', () => {
    ({ getByText } = render(
      <AdminListComponent
        admins={admins}
        fetchAdmins={fetchAdmins}
      />,
    ));
    getByText('First User');
    getByText('Second User');
    getByText('Third User');
  });
});
