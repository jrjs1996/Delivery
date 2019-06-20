import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminMenuButton from './ForwardBackButton';


describe('ForwardBackButton', () => {
  let component;
  let root;

  let onForwardResult = false;
  let onBackResult = false;

  beforeEach(() => {
  });

  afterEach(() => {
    component = null;
    root = null;
    onForwardResult = false;
    onBackResult = false;
  });

  it('onForward is called', () => {
    component = create(
      <Router>
        <AdminMenuButton
          home="/home/"
          to="/to/"
          pathname="/home/"
          onForward={() => { onForwardResult = true; }}
          onBack={() => { onBackResult = true; }}
        />
      </Router>,
    );
    ({ root } = component);
    const button = root.findByType('button');
    button.props.onClick();
    expect(onForwardResult).toBe(true);
  });

  it('onBack is called', () => {
    component = create(
      <Router>
        <AdminMenuButton
          home="/home/"
          to="/to/"
          pathname="/to/"
          onForward={() => { onForwardResult = true; }}
          onBack={() => { onBackResult = true; }}
        />
      </Router>,
    );
    ({ root } = component);
    const button = root.findByType('button');
    button.props.onClick();
    expect(onBackResult).toBe(true);
  });

  it('Works without onForward', () => {
    component = create(
      <Router>
        <AdminMenuButton
          home="/home/"
          to="/to/"
          pathname="/home/"
        />
      </Router>,
    );
    ({ root } = component);
    const button = root.findByType('button');
    button.props.onClick();
  });

  it('Works without onBack', () => {
    component = create(
      <Router>
        <AdminMenuButton
          home="/home/"
          to="/to/"
          pathname="/to/"
        />
      </Router>,
    );
    ({ root } = component);
    const button = root.findByType('button');
    button.props.onClick();
  });
});
