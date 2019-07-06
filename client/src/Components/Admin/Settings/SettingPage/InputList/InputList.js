import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import SettingPageInput from '../SettingPageInput/SettingPageInput';

export default function InputList({ onChange, name, value }) {
  const [keys, setKeys] = useState(value.map(() => shortid.generate()));
  return (
    <div name={name}>
      {value.map((v, i) => (
        <div key={keys[i]}>
          <SettingPageInput
            required
            fullWidth
            label={`${name} ${i}`}
            name={`${name}${i}`}
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
              const newKeys = keys.slice();
              newKeys.splice(i, 1);
              setKeys(newKeys);
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
          const newKeys = keys.slice();
          newKeys.push(shortid.generate());
          setKeys(newKeys);
          onChange({ target: { name, value: newValues } });
        }}
      >
        +
      </button>
    </div>
  );
}

InputList.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

InputList.defaultProps = {
  onChange: () => {},
  value: [],
};
