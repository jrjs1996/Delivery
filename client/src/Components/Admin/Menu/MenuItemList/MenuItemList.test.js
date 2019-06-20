import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import MenuItemList from './MenuItemList';


describe('MenuItemList', () => {
  let getByText;
  let getAllByText;
  let getAllByTestId;

  let onSelectResult = false;
  let onDeleteResult = false;

  const menuMock = [
    {
      archived: false,
      created: 'Test',
      description: 'TestDescription',
      menuNumber: '1',
      price: '20.00',
      revision: '0',
      title: 'TestItem1',
      __v: '0',
      _id: '0',
    },
    {
      archived: false,
      created: 'Test',
      description: 'TestDescription2',
      menuNumber: '2',
      price: '10.00',
      revision: '0',
      title: 'TestItem2',
      __v: '0',
      _id: '0',
    },
  ];

  beforeEach(() => {
    ({ getByText, getAllByText, getAllByTestId } = render(
      <MenuItemList
        onSelect={() => { onSelectResult = true; }}
        onDelete={() => { onDeleteResult = true; }}
        renderItem={i => (
          <div>
            <h3>
              TestRender
            </h3>
            {i}
          </div>
        )}
        menu={menuMock}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    onSelectResult = false;
    onDeleteResult = false;
  });

  it('Displays menu items', () => {
    getByText('TestDescription');
    getByText('TestDescription2');
  });

  it('Render item works', () => {
    const items = getAllByText('TestRender');
    expect(items.length).toBe(2);
  });

  it('onClick works', () => {
    fireEvent.click(getByText('TestItem1'));
    expect(onSelectResult).toBe(true);
    expect(onDeleteResult).toBe(false);
  });

  it('onDelete works', () => {
    fireEvent.click(getAllByText('Delete')[0]);
    expect(onSelectResult).toBe(false);
    expect(onDeleteResult).toBe(true);
  });

  it('Works without render item', () => {
    cleanup();
    ({ getByText } = render(
      <MenuItemList
        onSelect={() => { onSelectResult = true; }}
        onDelete={() => { onDeleteResult = true; }}
        menu={menuMock}
      />,
    ));
    getByText('TestDescription');
  });

  it('Doesn\'t render delete button when onDelete isn\'t provided', () => {
    cleanup();
    ({ getByText } = render(
      <MenuItemList
        onSelect={() => { onSelectResult = true; }}
        onDelete={() => { onDeleteResult = true; }}
        menu={menuMock}
      />,
    ));
    try {
      getByText('Delete');
      throw error;
    } catch (e) { }
  });
});
