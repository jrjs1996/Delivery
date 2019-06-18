import React from 'react';
import PropTypes from 'prop-types';

export default function FormInput(props) {
  console.log(props)
  //const { type, placeholder } = props;
  return (
    <div className="signUpRow">
      <input {...props} className="form-control" />
    </div>
  );
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
