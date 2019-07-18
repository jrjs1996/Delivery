import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';
import { Router, Link, BrowserRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import SidePanelItem from './SidePanelItem';


describe('Side Menu Item', () => {
  let getByText;

  const sideMenuItem = (
    <Router history={new BrowserRouter().history}>
      <SidePanelItem
        to="/test"
        text="Test Item"
      >
        <PersonIcon />
      </SidePanelItem>
    </Router>
  );


  beforeEach(() => {
    ({ getByText } = render(sideMenuItem));
  });

  afterEach(() => {
    cleanup();
  });

  it('displays text', () => {
    getByText('Test Item');
  });
  it('has correct link', () => {
    const component = create(sideMenuItem);

    const link = component.root.findByType(Link);
    expect(link.props.to).toBe('/test');
  });

  it('has icon', () => {
    const component = create(sideMenuItem);
    component.root.findByType(PersonIcon);
  });
});
