import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import CrudPage from './CrudPage';

let getByText;
let renderForm = jest.fn();
let renderList = jest.fn();

const itemsMock = [
  {
    id: 1,
    name: 'first',
  },
  {
    id: 2,
    name: 'Second',
  },
];

describe('CrudPage with renderList', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/']}>
        <CrudPage
          formPath="/form/"
          items={itemsMock}
          listPath="/"
          renderForm={renderForm}
          renderList={renderList}
          title="Test Title"
          pathName="/"
        />
      </Router>
      ,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Displays title', () => {
    getByText('Test Title');
  });

  it('Calls renderList with list', () => {
    expect(renderList.mock.calls[0][0]).toBe(itemsMock);
  });
});

describe('CrudPage with renderForm', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/form/']}>
        <CrudPage
          formPath="/form/"
          items={itemsMock}
          listPath="/"
          renderForm={renderForm}
          renderList={renderList}
          title="Test Title"
          pathName="/"
        />
      </Router>
      ,
    ));
  });

  afterEach(() => {
    cleanup();
  });

  it('Calls renderForm with empty object.', () => {
    expect(renderForm).toBeCalledWith({});
  });
});

describe('CrudPage with navigation', () => {
  const jsx = (
    <Router initialEntries={['/']}>
      <Route
        path="/"
        render={({ history }) => (
          <CrudPage
            formPath="/form/"
            items={itemsMock}
            listPath="/"
            renderForm={renderForm}
            renderList={(items, setSelectedItem) => {
              setSelectedItem(items[0]);
              history.push('/form/');
            }}
            title="Test Title"
            pathName="/"
          />
        )}
      />
    </Router>
  );

  beforeEach(() => {
    ({ getByText } = render(jsx));
  });

  afterEach(() => {
    cleanup();
  });

  it('Calls render form with selected object.', () => {
    expect(renderForm).toBeCalledWith(itemsMock[0]);
  });
});

describe('Crud page with simulated form', () => {
  beforeEach(() => {
    ({ getByText } = render(
      <Router initialEntries={['/form/']}>
        <CrudPage
          formPath="/form/"
          items={itemsMock}
          listPath="/"
          renderForm={() => {
            <button
          })}
          renderList={renderList}
          title="Test Title"
          pathName="/"
        />
      </Router>
      ,
    ));
  });
});
