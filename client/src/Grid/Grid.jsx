/* eslint-disable no-unused-vars */
import React from "react";
import "./Grid.css";

const Grid = ({data,onCellClick}) => {
  const cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cells.push(
        <div
          id={"cell" + (i * 3 + j)}
          key={i * 3 + j}
          className="cell"
          onClick={() => {
            onCellClick(data[i]);
          }}
        >
          {data[i * 3 + j]}
        </div>
      );
    }
  }

  return <div className="grid">{cells}</div>;
};

export default Grid;
