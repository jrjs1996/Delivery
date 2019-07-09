import React from 'react';
import PropTypes from 'prop-types';

export default function FormButton(props) {
  const { title, onClick } = props;
  return (
    <div className="signUpRow">
      <button type="submit" className="btn btn-primary" onClick={onClick}>{title}</button>
    </div>
  );
}

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
};
