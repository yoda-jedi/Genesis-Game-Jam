import React, { useState, useRef } from "react";
import { round, evaluate } from "mathjs";
import "./App.css";
import Grid from "./Grid/Grid";
import Timer from "./Timer/Timer";
import Player from "./Player/Player";

const data = [
  "2 * x",
  "x + 20",
  "200 - x",
  "500 / x",
  "3 * x - 2 * x",
  "2000 + x",
  "3 * x / 2",
  "x",
  "2 * x + 1",
];

const App = () => {
  const [userDamage, setUserDamage] = useState(0);
  const [userHealth, setUserHealth] = useState(100);
  const [counter, setCounter] = useState(15);
  const [isCounterFrozen, setCounterFrozen] = useState(false);
  const setCounterRef = useRef(setCounter);
  const playerIdleSprite = "../src/assets/Character/Archer/Idle.png";
  const playerAttackSprite = "../src/assets/Character/Archer/Shot_1.png";

  const handleCellClick = (value) => {
    setCounterFrozen(true);
    console.log(`Clicked cell value: ${value}`); // Log value to console
    const result = evaluate(value.replace("x", counter)); // Evaluate expression
    setUserDamage(round(result));
  };

  React.useEffect(() => {
    setCounterRef.current = setCounter;
  }, [setCounter]);

  return (
    <div className="main-div">
      <div>
        <h1 className="game-heading water-background">Math Duel</h1>
        <div className="expression-matrix">
          <Grid data={data} onCellClick={handleCellClick} />
        </div>
        <div className="timer">
          <Timer
            counter={counter}
            setCounter={setCounterRef.current}
            isCounterFrozen={isCounterFrozen}
          />
        </div>
      </div>
      <div className="players">
        <div className="user">
          <div className="player-tag">User</div>
          {/* <img
            src="../src/assets/Character/Archer/Idle.gif"
            alt="Idle GIF"
            width={128}
            height={128}
          /> */}
          <Player imageUrl={playerIdleSprite} />
          <div className="user-health">HP : {userHealth}</div>
          <div className="user-damage">Attack : {userDamage}</div>
        </div>
        <div className="opponent">
          <div className="opp-tag">Opponent</div>
          <Player imageUrl={playerIdleSprite} flip />
          {/* <img
            src="../src/assets/Character/Archer/Idle.gif"
            alt="Idle GIF"
            width={128}
            height={128}
            style={{ transform: "scaleX(-1)" }}
          /> */}
          <div className="opp-health">HP : {userHealth}</div>
          <div className="opp-damage">Attack : {userDamage}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
