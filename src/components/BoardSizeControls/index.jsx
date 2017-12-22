import React from 'react';
import PropTypes from 'prop-types';

import ControlLabel from '../ControlLabel';
import ToggleButton from '../ToggleButton';

const BoardSizeControls = props => (
  <div className="board-size-ctrls">
    <ControlLabel text="Board Size:" />
    <ToggleButton
      text="10x10"
      onChange={() => props.onChange(10, 10)}
      id="_10x10"
      checked={props.columns === 10 && props.rows === 10}
      name="board-size"
    />
    <ToggleButton
      text="20x20"
      onChange={() => props.onChange(20, 20)}
      id="_20x20"
      checked={props.columns === 20 && props.rows === 20}
      name="board-size"
    />
    <ToggleButton
      text="40x20"
      onChange={() => props.onChange(20, 40)}
      id="_40x20"
      checked={props.columns === 40 && props.rows === 20}
      name="board-size"
    />
  </div>
);

BoardSizeControls.propTypes = {
  onChange: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

export default BoardSizeControls;
