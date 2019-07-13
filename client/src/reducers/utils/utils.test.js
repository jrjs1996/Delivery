import * as utils from './utils';

const array = [{ id: 1, value: 'one' }, { id: 2, value: 'two' }];
const state = () => ({
  1: {
    id: 1,
    value: 'one',
  },
  2: {
    id: 2,
    value: 'two',
  },
});

describe('Create items', () => {
  it(' Converts an array of items to an object with the items properties and the idProperty as keys.', () => {
    expect(utils.createItems(array, 'id')).toMatchSnapshot();
  });
});

describe('Insert Item', () => {
  it('Insert an object into state with the key of the object being the value of the key property.', () => {
    expect(utils.insertItem(state(), { id: 4, value: 'four' }, 'id')).toMatchSnapshot();
  });
});

describe('Update Item', () => {
  it('Updates item with matching id property', () => {
    expect(utils.updateItem(state(), { id: 2, value: 'Newtwo' }, 'id')).toMatchSnapshot();
  });
});

describe('Delete Item', () => {
  it('Deletes item with matching id property', () => {
    expect(utils.deleteItem(state(), { id: 2 }, 'id')).toMatchSnapshot();
  });
})
