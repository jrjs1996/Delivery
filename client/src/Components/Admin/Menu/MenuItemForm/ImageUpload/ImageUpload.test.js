import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import ImageUpload from './ImageUpload';


describe('ImageUpload.test', () => {
  let getByText;

  let uploadImage = jest.fn();


  beforeEach(() => {
    ({ getByText } = render(
      <ImageUpload
        id="TestId"
        uploadImage={uploadImage}
      />,
    ));
  });

  afterEach(() => {
    cleanup();
    uploadImage = jest.fn();
  });

  it('Calls uploadImage when upload button is clicked.', () => {
    fireEvent.click(getByText('Upload'));
    expect(uploadImage).toBeCalledWith('TestId', undefined);
  });
});
