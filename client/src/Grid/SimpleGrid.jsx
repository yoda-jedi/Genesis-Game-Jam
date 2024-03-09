/* eslint-disable no-unused-vars */
import React from "react";
import "./Grid.css";

const Grid = ({data, onCellClick}) => {
  const cells = [];
  for (let i = 0; i < 3; i++) {
      cells.push(
        <div
          id={"cell" + (i)}
          key={i}
          className="cell"
          onClick={() => {
            onCellClick(data[i]);
          }}
        >
          {data[i]}
        </div>
      );
    }

  return <div className="grid">{cells}</div>;
};

export default Grid;
