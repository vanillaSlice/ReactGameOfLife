import React from 'react';
import '../styles/Controls.css';
import ToggleButton from './ToggleButton';

const BoardSizeControls = (props) => {
  return (
    <div className="Controls BoardSizeControls">
      <span className="label">Board Size:</span>
      <ToggleButton 
        text="10x10"
        onChange={() => props.onChange(10, 10)}
        id="10x10"
        checked={props.boardWidth === 10 && props.boardHeight === 10}
        name="board-size" 
      />
      <ToggleButton 
        text="20x20"
        onChange={() => props.onChange(20, 20)}
        id="20x20"
        checked={props.boardWidth === 20 && props.boardHeight === 20}
        name="board-size" 
      />
      <ToggleButton 
        text="40x20"
        onChange={() => props.onChange(40, 20)}
        id="40x20"
        checked={props.boardWidth === 40 && props.boardHeight === 20}
        name="board-size" 
      />
    </div>
  );
};

export default BoardSizeControls;
