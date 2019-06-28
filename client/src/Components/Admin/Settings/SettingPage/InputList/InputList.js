import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import SettingPageInput from '../SettingPageInput/SettingPageInput';


export default function InputList({ onChange, name, value }) {
  return (
    <div name={name}>
      {value.map((v, i) => (
        <div key={shortid.generate()}>
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

InputList.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
};

InputList.defaultProps = {
  onChange: () => {},
  value: [],
};
