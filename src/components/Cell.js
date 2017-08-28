import React from 'react';

import '../styles/Cell.css';

const Cell = (props) => {
  return (
    <div className="Cell" onClick={props.onClick}>
      {props.alive &&
        <span
          className="emoji"
          dangerouslySetInnerHTML={{__html: props.emoji}}
        />
      }
    </div>
  );
};

export default Cell;
