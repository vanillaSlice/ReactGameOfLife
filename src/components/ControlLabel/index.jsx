import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const ControlLabel = props => (
  <span className="ctrl-label">{props.text}</span>
);

ControlLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ControlLabel;
