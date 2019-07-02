

// eslint-disable-next-line import/prefer-default-export
export const menuItemsMock = [
  {
    archived: false,
    created: 'Now',
    description: `A hamburger (short: burger) is a sandwich consisting of one or more cooked
    patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The
    patty may be pan fried, grilled, or flame broiled. Hamburgers are often served with
     cheese, lettuce, tomato, onion, pickles, bacon, or chiles; condiments such as ketchup,
     mayonnaise, mustard, relish, or 'special sauce'; and are frequently placed on sesame
    seed buns. A hamburger topped with cheese is called a cheeseburger.`,
    menuNumber: 1,
    price: 10.50,
    revision: 0,
    title: 'Hamburger',
    __v: 0,
    _id: '0',
  },
  {
    archived: false,
    created: 'Now',
    description: `A salad is a dish consisting of a mixture of small pieces of food, usually vegetables.
    [1][2] However, different varieties of salad may contain virtually any type of ready-to-eat food.
     Salads are typically served at room temperature or chilled, with notable exceptions such as south
     German potato salad which is served warm.`,
    menuNumber: 2,
    price: 8.25,
    revision: 0,
    title: 'Salad',
    __v: 0,
    _id: '1',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const menuItemsFormMock = [
  {
    archived: false,
    created: 'Now',
    description: `A hamburger (short: burger) is a sandwich consisting of one or more cooked
    patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The
    patty may be pan fried, grilled, or flame broiled. Hamburgers are often served with
     cheese, lettuce, tomato, onion, pickles, bacon, or chiles; condiments such as ketchup,
     mayonnaise, mustard, relish, or 'special sauce'; and are frequently placed on sesame
    seed buns. A hamburger topped with cheese is called a cheeseburger.`,
    menuNumber: '1',
    price: '10.50',
    revision: 0,
    title: 'Hamburger',
    __v: 0,
    _id: '0',
  },
  {
    archived: false,
    created: 'Now',
    description: `A salad is a dish consisting of a mixture of small pieces of food, usually vegetables.
    [1][2] However, different varieties of salad may contain virtually any type of ready-to-eat food.
     Salads are typically served at room temperature or chilled, with notable exceptions such as south
     German potato salad which is served warm.`,
    menuNumber: '2',
    price: '8.25',
    revision: 0,
    title: 'Salad',
    __v: 0,
    _id: '1',
  },
];

export const customersMock = [
  {
    __v: 0,
    _id: '0',
    addresses: [],
    email: 'johnD@email.com',
    firstName: 'John',
    lastName: 'Davidson',
  },
  {
    __v: 0,
    _id: '1',
    addresses: [],
    email: 'Bobby@email.com',
    firstName: 'Bob',
    lastName: 'Harris',
  },
];

export const ordersMock = [
  {
    __v: 0,
    _id: '0',
    stage: 0,
    address: '232 Blue St.',
    orderCreated: 'Mon Jul 01 2019 23:57:40 GMT-060',
    delivery: true,
    customerName: 'Joe Green',
    items: menuItemsMock,
  },
  {
    __v: 0,
    _id: '1',
    stage: 2,
    address: '322 Park St.',
    orderCreated: 'Mon Jul 02 2019 23:57:40 GMT-060',
    delivery: false,
    customerName: 'John Anderson',
    items: [menuItemsMock[1]],
  },
];
