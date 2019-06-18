import React from 'react';
import PropTypes from 'prop-types';

export default function FormButton(props) {
  const { title } = props;
  return (
    <div className="signUpRow">
      <button type="submit" className="btn btn-primary">{title}</button>
    </div>
  );
}

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
};
