import React from 'react';
import { create } from 'react-test-renderer';
import SettingList from './SettingList';
import SettingListItem from './SettingListItem/SettingListItem';

describe('Setting List', () => {
  let component;
  let root;
  let listItems;

  let onClickResult;

  const items = [
    { name: 'First' },
    { name: 'Second' },
    { name: 'Third' },
  ];

  beforeEach(() => {
    component = create(
      <SettingList
        items={items}
        itemString={i => i.name}
        onClick={i => { onClickResult = i.name }}
        title="Test List"
      />,
    );
    ({ root } = component);
    listItems = root.findAllByType(SettingListItem);
  });

  afterEach(() => {
    component = null;
    root = null;
    onClickResult = null;
    listItems = null
  });

  it('Has correct title', () => {
    const title = root.find(c => c.props.id === 'title');
    expect(title.props.children).toBe('Test List');
  });

  it('List items have correct text', () => {
    expect(listItems[0].props.text).toBe('First');
    expect(listItems[1].props.text).toBe('Second');
    expect(listItems[2].props.text).toBe('Third');
  });

  it('OnClick works when list items are clicked on', () => {
    listItems[0].props.onClick();
    expect(onClickResult).toBe('First');

    listItems[1].props.onClick();
    expect(onClickResult).toBe('Second');

    listItems[2].props.onClick();
    expect(onClickResult).toBe('Third');
  });
});
