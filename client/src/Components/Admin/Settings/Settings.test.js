import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import {
  render, cleanup, fireEvent, getByLabelText,
} from '@testing-library/react';
import 'jest-dom/extend-expect';
import { SettingsComponent } from './Settings';
import { adminsMock } from '../../../tests/mocks';

describe('Settings.test', () => {
  let getByText;
  let createAction = jest.fn();
  let fetchAction = jest.fn();
  let updateAction = jest.fn();
  let updateCurrentAdminAction = jest.fn();

  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route
          path="/"
          render={props => (
            <SettingsComponent
              admins={adminsMock}
              createAction={createAction}
              currentAdmin={adminsMock[0]}
              fetchAction={fetchAction}
              updateAction={updateAction}
              updateCurrentAdminAction={updateCurrentAdminAction}
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
    updateCurrentAdminAction = jest.fn();
  });

  it('Displays main settings menu initially', () => {
    getByText('Settings');
  });

  it('Goes to change username when button is clicked on', () => {
    fireEvent.click(getByText('Change Username'));
    getByText(new RegExp('^New Username*'));
  });

  it('Goes to change password when button is clicked on', () => {
    fireEvent.click(getByText('Change Password'));
    getByText(new RegExp('^New Password*'));
  });

  it('Goes to admin list when button is clicked on', () => {
    fireEvent.click(getByText('Edit Admins'));
    getByText(adminsMock[0].username);
  });

  it('Back button works', () => {
    fireEvent.click(getByText('Change Username'));
    getByText(new RegExp('^New Username*'));
    fireEvent.click(getByText('Back'));
    getByText(new RegExp('Settings'));
  });
});
