/**
 *  Converts an array of items to an object with the
 * items properties and the idProperty as keys.
 * @param {Array[object]} itemsArray Array of items.
 * @param {string} idProperty Property to use as key.
 */
export const createItems = (itemsArray, idProperty) => {
  const items = {};
  itemsArray.forEach((item) => {
    items[item[idProperty]] = item;
  });
  return items;
};

/**
 * Inserts an object into state.
 * @param {Object} items Current items in state
 * @param {Object} newItem Item to insert into state
 * @param {String} idProperty Property to use as the key in state.
 */
export const insertItem = (items, newItem, idProperty) => ({
  ...items,
  [newItem[idProperty]]: newItem,
});

/**
 * Updates an object in state.
 * @param {Object} items Current items in state.
 * @param {Object} newItem Item to update in state.
 * @param {String} idProperty Property to use as key to find object.
 */
export const updateItem = (items, newItem, idProperty) => ({
  ...items,
  [newItem[idProperty]]: Object.assign(items[newItem[idProperty]], newItem),
});

/**
 * Deletes an item in state.
 * @param {Object} items Current items in state
 * @param {Object} newItem Item to delete from state.
 * @param {String} idProperty Property to use as key to find object.
 */
export const deleteItem = (items, newItem, idProperty) => {
  const { [newItem[idProperty]]: omit, ...rest } = items;
  return rest;
};
