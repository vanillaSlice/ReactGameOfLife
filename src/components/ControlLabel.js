import React from 'react';

import '../styles/ControlLabel.css';

const ControlLabel = (props) => {
  return (
    <span className="ControlLabel">{props.text}</span>
  );
};

export default ControlLabel;
