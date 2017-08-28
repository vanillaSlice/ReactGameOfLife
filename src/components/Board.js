import React from 'react';

import '../styles/Board.css';

const Board = (props) => {
  return (
    <div className="Board">
      {props.cells.map((row, i) => (
        <div className="row" key={i}>{row}</div>
      ))}
    </div>
  );
}

export default Board;
