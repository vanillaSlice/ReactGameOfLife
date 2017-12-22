import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Button = props => (
  <button className="btn" type="button" onClick={props.onClick}>
    {props.text}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
