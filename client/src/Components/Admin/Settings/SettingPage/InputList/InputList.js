import React, { useState } from 'react';
import SettingPageInput from '../SettingPageInput/SettingPageInput';


export default function InputList({ onChange, name, value }) {
  return (
    <div name={name}>
      {value.map((v, i) => (
        <div>
          <SettingPageInput
            required
            fullWidth
            label={`${name} ${i}`}
            value={v}
            onChange={(e) => {
              const newValues = value.slice();
              newValues[i] = e.target.value;
              onChange({ target: { name, value: newValues } });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newValues = value.slice();
              newValues.splice(i, 1);
              onChange({ target: { name, value: newValues } });
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newValues = value.slice();
          newValues.push('');
          onChange({ target: { name, value: newValues } });
        }}
      >
        +
      </button>
    </div>
  );
}
