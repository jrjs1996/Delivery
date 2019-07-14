import React from 'react';
import { create } from 'react-test-renderer';
import { StaticRouter as Router, Route } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import HomeIcon from '@material-ui/icons/Home';
import SideMenuItem from './SideMenu/SideMenuItem/SideMenuItem';
import Navigation from './Navigation';

describe('Navigation.test', () => {
  let getByText;
  let getAllByText;

  beforeEach(() => {
    ({ getByText, getAllByText } = render(
      <Router history={['/']}>
        <Route
          path="/"
          render={() => (
            <Navigation>
              <SideMenuItem to="/admin/" text="Home">
                <HomeIcon />
              </SideMenuItem>
            </Navigation>
          )}
        />
      </Router>,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Renders children side menu items', () => {
    getAllByText('Home');
  });
});
