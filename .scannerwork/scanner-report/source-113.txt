import React from 'react';
import PropTypes from 'prop-types';

export default function FormCheckBox(props) {
  const { id, label } = props;
  return (
    <div className="signUpRow">
      <label htmlFor={id} id={id}>
        <input id={id} type="checkbox" />
        {label}
      </label>
    </div>
  );
}

FormCheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
