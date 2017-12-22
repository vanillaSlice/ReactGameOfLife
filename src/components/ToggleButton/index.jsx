import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const ToggleButton = props => (
  <label className="toggle-btn" htmlFor={props.id}>
    <input
      className="toggle-btn__input"
      type="radio"
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      checked={props.checked}
    />
    <span className="toggle-btn__text">
      {props.text}
    </span>
  </label>
);

ToggleButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

ToggleButton.defaultProps = {
  checked: false,
};

export default ToggleButton;
