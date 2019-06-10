import React from 'react';
import Proptypes from 'prop-types';

export default function SignUpHeader(props) {
  const { title } = props;
  return (
    <div id="signUpHeader">
      <div id="signUpHeaderTitle">
        {title}
      </div>
    </div>
  );
}

SignUpHeader.propTypes = {
  title: Proptypes.string.isRequired,
};
