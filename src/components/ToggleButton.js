import React from 'react';
import '../styles/ToggleButton.css';

const ToggleButton = (props) => {
  return (
    <span className="ToggleButton">
      <input
        type="radio"
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.id}>{props.text}</label>
    </span>
  );
};

export default ToggleButton;
