import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { BrowserRouter, Router, Link } from 'react-router-dom';
import SettingsMenuItem from './SettingsMenuItem';


describe('SettingsMenuItem', () => {
  let onClickResult = false;

  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <Router history={new BrowserRouter().history}>
        <SettingsMenuItem
          onClick={() => { onClickResult = true; }}
          text="Test Menu Item"
          to="/test"
        />
      </Router>
      ,
    ));
  });

  afterEach(() => {
    onClickResult = false;
    cleanup();
  });

  it('has correct text', () => {
    getByText('Test Menu Item');
  });

  it('onClick works', () => {
    fireEvent.click(getByText('Test Menu Item'));
    expect(onClickResult).toBe(true);
  });

  it('has link', () => {
    const component = create(
      <Router history={new BrowserRouter().history}>
        <SettingsMenuItem
          onClick={() => { onClickResult = true; }}
          text="Test Menu Item"
          to="/test"
        />
      </Router>,
    );

    const link = component.root.findByType(Link);
    expect(link.props.to).toBe('/test');
  });
});
