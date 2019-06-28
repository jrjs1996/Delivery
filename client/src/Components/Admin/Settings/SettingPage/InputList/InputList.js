import React, { useState } from 'react';
import SettingPageInput from '../SettingPageInput/SettingPageInput';


export default function InputList({ onChange, name, value }) {
  const [values, setValues] = useState(value);
  return (
    <div name={name}>
      {values.map((v, i) => (
        <div>
          <SettingPageInput
            required
            fullWidth
            label={`${name} ${i}`}
            value={v}
            onChange={(e) => {
              const newValues = values.slice();
              newValues[i] = e.target.value;
              onChange({ target: { name, value: newValues } });
              setValues(newValues);
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newValues = values.slice();
              newValues.splice(i, 1);
              onChange({ target: { name, value: newValues } });
              setValues(newValues);
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newValues = values.slice();
          newValues.push('');
          onChange({ target: { name, value: newValues } });
          setValues(newValues);
        }}
      >
        +
      </button>
    </div>
  );
}
