import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import AdminSettings from './AdminSettings';

describe('AdminSettings.test', () => {
  let getByText;

  const onClick = jest.fn();

  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']}>
        <AdminSettings onClick={onClick} />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Has all items', () => {
    getByText('Change Username');
    getByText('Change Password');
    getByText('Edit Admins');
  });

  it('Calls onClick when item is clicked on', () => {
    fireEvent.click(getByText('Change Username'));
    expect(onClick).toBeCalled();
  });
});
