/* eslint-disable no-unused-vars */
import React from "react";

const Timer = ({ counter, setCounter, isCellClicked }) => {
  React.useEffect(() => {
    let timeoutId;

    if (counter > 0 && !isCellClicked) {
      timeoutId = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [counter, setCounter, isCellClicked]);

  return <div>Countdown: {counter}</div>;
};

export default Timer;
