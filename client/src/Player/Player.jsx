import React from "react";
import "./Player.css";

const Player = ({ imageUrl, flip }) => {
  return (
    <div>
      <div
        className="sprite"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: flip ? "scaleX(-1)" : "none",
        }}
      />
    </div>
  );
};

export default Player;
