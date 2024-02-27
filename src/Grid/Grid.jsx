/* eslint-disable no-unused-vars */
import React from "react";
import "./Grid.css";

const Grid = (props) => {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push(
        <div
          key={i * 3 + j}
          className="cell"
          onClick={() => props.onCellClick(props.data[i * 3 + j])}
        >
          {props.data[i * 3 + j]}
        </div>
      );
    }
  }

  return <div className="grid">{cells}</div>;
};

export default Grid;
