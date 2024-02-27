import { useCallback, useEffect, useRef, useState } from "react";
import "./Player.css";

const playerSize = 128;
const playerBackgroud = new Image();
playerBackgroud.src = "../src/assets/Character/Archer/Idle.png";

let playerLeftIdx = 0;
let playerLeft = 0;
let playerTop = 0;
let lastTime = 0;

const draw = (ctx, now) => {
  if (!ctx) return;
  if (now - lastTime >= 1000) {
    lastTime = now;
    playerLeftIdx = (playerLeftIdx + 1) % 4;
    playerLeft = -playerSize * playerLeftIdx;

    ctx.clearRect(0, 0, playerSize, playerSize);
    ctx.drawImage(
      playerBackgroud,
      playerLeft,
      playerTop,
      playerSize * 4,
      playerSize * 4
    );
  }
};

export default function Player() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  const animatePlayerLoop = useCallback(
    (now) => {
      if (!ctx) return;
      draw(ctx, now);
      window.requestAnimationFrame(animatePlayerLoop);
    },
    [ctx]
  );

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
    window.requestAnimationFrame(animatePlayerLoop);
  }, [canvasRef, animatePlayerLoop]);

  return (
    <div className="Player">
      <canvas ref={canvasRef} className="Character" width="128" height="128" />
    </div>
  );
}
