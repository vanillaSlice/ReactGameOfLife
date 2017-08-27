import React from 'react';
import Button from './Button';

const MainControls = (props) => {
  return (
    <div className="MainControls">
      <Button text="Play" onClick={props.onPlayButtonClick} />
      <Button text="Pause" onClick={props.onPauseButtonClick} />
      <Button text="Reset" onClick={props.onResetButtonClick} />
      <Button text="Clear" onClick={props.onClearButtonClick} />
    </div>
  );
};

export default MainControls;
