import React from 'react';
import { render, cleanup } from '@testing-library/react';
import './node_modules/jest-dom/extend-expect';
import PersonIcon from '@material-ui/icons/Person';
import { Router, BrowserRouter } from 'react-router-dom';
import SidePanel from './SidePanel';
import SideMenuItem from './SidePanelItem/SidePanelItem';


describe('SideMenu.test', () => {
  let getByText;
  beforeEach(() => {
    ({ getByText } = render(
      <Router history={new BrowserRouter().history}>
        <SidePanel>
          <SideMenuItem to="/first" text="First">
            <PersonIcon />
          </SideMenuItem>
          <SideMenuItem to="/second" text="Second">
            <PersonIcon />
          </SideMenuItem>
        </SidePanel>
      </Router>
      ,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays Items', () => {
    getByText('First');
    getByText('Second');
  });
});
