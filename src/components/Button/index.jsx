import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Button = (props) => {
  const { onClick, text } = props;

  return (
    <button className="btn" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
