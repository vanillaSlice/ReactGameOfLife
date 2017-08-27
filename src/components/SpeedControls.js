import React from 'react';
import '../styles/Controls.css';
import ToggleButton from './ToggleButton';

const SpeedControls = (props) => {
  return (
    <div className="Controls SpeedControls">
      <span className="label">Speed:</span>
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
};

export default SpeedControls;
