// TODO: Should I use a binary search for this?
// TODO: Should a make items a dictionary?

export const insertItem = (items, newItem, idProperty) => {
  const newItems = items.slice();
  if (newItems.length === 0) return [newItem];

  for (let i = 0; i < newItems.length; i += 1) {
    if (newItems[i][idProperty] > newItem[idProperty]) {
      newItems.splice(i, 0, newItem);
      return newItems;
    }
  }
  newItems.push(newItem);
  return newItems;
};

export const updateItem = (items, newItem, idProperty) => {
  const newItems = items.slice();
  if (newItems.length === 0) return [newItem];

  for (let i = 0; i < newItems.length; i += 1) {
    if (newItems[i][idProperty] === newItem[idProperty]) {
      newItems[i] = newItem;
      return newItems;
    }
  }
  return newItems;
};

export const deleteItem = (items, newItem, idProperty) => {
  const newItems = items.slice();
  if (newItems.length === 0) return [newItem];

  for (let i = 0; i < newItems.length; i += 1) {
    if (newItems[i][idProperty] === newItem[idProperty]) {
      newItems.splice(i, 1);
      return newItems;
    }
  }
  return newItems;
};
