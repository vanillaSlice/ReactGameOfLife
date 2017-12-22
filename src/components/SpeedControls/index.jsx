import React from 'react';
import PropTypes from 'prop-types';

import ControlLabel from '../ControlLabel';
import ToggleButton from '../ToggleButton';

const SpeedControls = props => (
  <div className="speed-ctrls">
    <ControlLabel text="Speed:" />
    <ToggleButton
      text="Slow"
      onChange={() => props.onChange(1000)}
      id="slow"
      checked={props.speed === 1000}
      name="speed"
    />
    <ToggleButton
      text="Medium"
      onChange={() => props.onChange(500)}
      id="medium"
      checked={props.speed === 500}
      name="speed"
    />
    <ToggleButton
      text="Fast"
      onChange={() => props.onChange(300)}
      id="fast"
      checked={props.speed === 300}
      name="speed"
    />
    <ToggleButton
      text="Fastest"
      onChange={() => props.onChange(100)}
      id="fastest"
      checked={props.speed === 100}
      name="speed"
    />
  </div>
);

SpeedControls.propTypes = {
  onChange: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
};

export default SpeedControls;
