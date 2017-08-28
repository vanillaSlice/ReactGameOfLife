import React from 'react';

import ControlLabel from './ControlLabel';
import ToggleButton from './ToggleButton';

const BoardSizeControls = (props) => {
  return (
    <div className="BoardSizeControls">
      <ControlLabel text="Board Size:" />
      <ToggleButton 
        text="10x10"
        onChange={() => props.onChange(10, 10)}
        id="10x10"
        checked={props.columns === 10 && props.rows === 10}
        name="board-size" 
      />
      <ToggleButton 
        text="20x20"
        onChange={() => props.onChange(20, 20)}
        id="20x20"
        checked={props.columns === 20 && props.rows === 20}
        name="board-size" 
      />
      <ToggleButton 
        text="40x20"
        onChange={() => props.onChange(20, 40)}
        id="40x20"
        checked={props.columns === 40 && props.rows === 20}
        name="board-size" 
      />
    </div>
  );
};

export default BoardSizeControls;
