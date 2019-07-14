import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import PersonIcon from '@material-ui/icons/Person';
import { Router, BrowserRouter } from 'react-router-dom';
import SideMenu from './SideMenu';
import SideMenuItem from './SideMenuItem/SideMenuItem';


describe('SideMenu.test', () => {
  let getByText;
  beforeEach(() => {
    ({ getByText } = render(
      <Router history={new BrowserRouter().history}>
        <SideMenu>
          <SideMenuItem to="/first" text="First">
            <PersonIcon />
          </SideMenuItem>
          <SideMenuItem to="/second" text="Second">
            <PersonIcon />
          </SideMenuItem>
        </SideMenu>
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
