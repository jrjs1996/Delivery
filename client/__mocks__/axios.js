export default {
  get: jest.fn(() => Promise.resolve({ status: 200, data: { mock: 'MockData' } })),
  post: jest.fn(() => Promise.resolve({ status: 200, data: { mock: 'MockData' } })),
  put: jest.fn(() => Promise.resolve({ status: 200, data: { mock: 'MockData' } })),
};
