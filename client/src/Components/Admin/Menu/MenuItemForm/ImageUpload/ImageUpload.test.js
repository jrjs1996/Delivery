import React from 'react';
import { create } from 'react-test-renderer';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import { DropzoneArea } from 'material-ui-dropzone';
import ImageUpload from './ImageUpload';

describe('ImageUpload.test', () => {
  let component;
  let uploadImage = jest.fn();

  beforeEach(() => {
    component = create(<ImageUpload id="TestId" uploadImage={uploadImage} />);
  });

  afterEach(() => {
    component = null;
    uploadImage = jest.fn();
  });

  it('Calls uploadImage on dropzone chagned.', () => {
    const input = component.root.findByType(DropzoneArea);
    input.props.onChange(['TestFile']);
    expect(uploadImage).toBeCalledWith('TestId', 'TestFile');
  });
});
