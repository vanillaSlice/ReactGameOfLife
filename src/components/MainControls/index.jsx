import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const MainControls = props => (
  <div className="main-ctrls">
    <Button text="Play" onClick={props.onPlayButtonClick} />
    <Button text="Pause" onClick={props.onPauseButtonClick} />
    <Button text="Reset" onClick={props.onResetButtonClick} />
    <Button text="Clear" onClick={props.onClearButtonClick} />
  </div>
);

MainControls.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  onPauseButtonClick: PropTypes.func.isRequired,
  onResetButtonClick: PropTypes.func.isRequired,
  onClearButtonClick: PropTypes.func.isRequired,
};

export default MainControls;
