import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent, getByLabelText } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Settings from './Settings';

describe('Settings.test', () => {
  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']} initialIndex={0}>
        <Route path="/" component={Settings} />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays main settings menu initially', () => {
    getByText('Settings');
  });

  it('Goes to change username when button is clicked on', () => {
    fireEvent.click(getByText('Change Username'));
    getByText(new RegExp('^New Username*'));
  });
});
