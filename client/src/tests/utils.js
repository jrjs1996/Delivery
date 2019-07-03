import { fireEvent } from '@testing-library/react';
/* eslint-disable import/prefer-default-export */
export const getByLabelAndInput = (label, inputText, getByLabelText) => {
  fireEvent.input(getByLabelText(new RegExp(`${label}*`)), { target: { value: inputText } });
};
