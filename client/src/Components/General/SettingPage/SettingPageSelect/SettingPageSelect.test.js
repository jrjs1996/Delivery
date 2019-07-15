import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import SettingPageSelect from './SettingPageSelect';


describe('SettingPageSelect', () => {
  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <SettingPageSelect
        name="testName"
        value={1}
        options={[
          [0, 'FirstOption'],
          [1, 'SecondOption'],
          [2, 'ThirdOption'],
        ]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays correct option initially', () => {
    getByText('SecondOption');
  });
});

describe('SettingPageSelect with getOptions', () => {
  let getByText;

  beforeEach(() => {
    ({ getByText } = render(
      <SettingPageSelect
        name="testName"
        value={1}
        options={[
          [0, 'FirstOption'],
          [1, 'SecondOption'],
          [2, 'ThirdOption'],
        ]}
        getOptions={() => [
          [0, 'FirstGetOption'],
          [1, 'SecondGetOption'],
          [2, 'ThirdGetOption'],
        ]}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays correct option initially', () => {
    getByText('SecondGetOption');
  });
});
