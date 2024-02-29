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
  const [userDamage, setUserDamage] = useState(null);
  const [userHealth, setUserHealth] = useState(100);
  const [counter, setCounter] = useState(15);
  const [isCellClicked, setIsCellClicked] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const setCounterRef = useRef(setCounter);
  const playerIdleSprite = "../src/assets/Character/Archer/Idle.png";
  const playerAttackSprite = "../src/assets/Character/Archer/Shot_1.png";
  const [playerActiveSprite, setPlayerActiveSprite] =
    useState(playerIdleSprite);

  const handleCellClick = (value) => {
    if (isCellClicked) {
      return;
    }
    setIsCellClicked(true);
    console.log(`Clicked cell value: ${value}`);
    const result = evaluate(value.replace("x", counter));
    setUserDamage(round(result));
  };

  React.useEffect(() => {
    setCounterRef.current = setCounter;
  }, [setCounter]);

  React.useEffect(() => {
    if (userDamage) {
      setIsAttacking(true);
      // Decrease userHealth by 1 unit until it becomes zero or equal to userHealth - userDamage
      const interval = setInterval(() => {
        setUserHealth((prevHealth) => {
          if (prevHealth <= prevHealth - userDamage || prevHealth == 0) {
            clearInterval(interval);
            return prevHealth;
          }
          return prevHealth - 1;
        });
        setUserDamage((prevDamage) => {
          if (prevDamage <= 0) {
            return prevDamage;
          }
          return prevDamage - 1;
        });
      }, 300);
      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
    setIsAttacking(false);
  }, [userDamage]);

  React.useEffect(() => {
    isAttacking
      ? setPlayerActiveSprite(playerAttackSprite)
      : setPlayerActiveSprite(playerIdleSprite);

    // console.log(playerActiveSprite);
  }, [isAttacking, playerActiveSprite]);

  return (
    <div className="main-div">
      <div>
        <h1 className="game-heading water-background">Math Duel</h1>
        <div className="expression-matrix">
          <Grid
            data={data}
            onCellClick={handleCellClick}
            isCellClicked={isCellClicked}
          />
        </div>
        <div className="timer">
          <Timer
            counter={counter}
            setCounter={setCounterRef.current}
            isCellClicked={isCellClicked}
          />
        </div>
      </div>
      <div className="players">
        <div className="user">
          <div className="player-tag">User</div>
          <Player imageUrl={playerActiveSprite} />
          <div className="user-health">HP : {userHealth}</div>
          <div className="user-damage">Attack : {userDamage}</div>
        </div>
        <div className="opponent">
          <div className="opp-tag">Opponent</div>
          <Player imageUrl={playerActiveSprite} flip />
          <div className="opp-health">HP : {userHealth}</div>
          <div className="opp-damage">Attack : {userDamage}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
