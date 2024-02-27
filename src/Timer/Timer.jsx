/* eslint-disable no-unused-vars */
import React from "react";

const Timer = ({ counter, setCounter, isCounterFrozen }) => {
  React.useEffect(() => {
    let timeoutId;

    if (counter > 0 && !isCounterFrozen) {
      timeoutId = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [counter, setCounter, isCounterFrozen]);

  return <div>Countdown: {counter}</div>;
};

export default Timer;
