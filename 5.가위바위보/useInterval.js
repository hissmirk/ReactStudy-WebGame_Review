import { useEffect, useRef } from "react";

function useInterval(callback, delay) { // 호출 -> useInterval(changeHand, isRunning ? 100 : null);
  const saveCallback = useRef();

  useEffect(() => {
    saveCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      saveCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return saveCallback.current;
}

export default useInterval;