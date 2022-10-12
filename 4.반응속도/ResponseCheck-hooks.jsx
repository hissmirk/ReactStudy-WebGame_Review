import React, { useRef, useState } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('CLICK TO START');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(1);
  const endTime = useRef(1);

  const onClickScreen = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('READY...');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('CLICK!');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(timeout.current);
      setState('waiting')
      setMessage('TOO EARLY!');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('CLICK TO START');
      setResult((prevState) => {
        return [...prevState, endTime.current - startTime.current];
      });
    }
  }

  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>RESPONSE AVERAGE: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>RESET</button>
      </>
  }

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {(() => {
        if (result.length === 0) {
          return null;
        } else {
          return <>
            <div>RESPONSE AVERAGE: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>RESET</button>
          </>
        }
      })()}

      {renderAverage()}
    </>
  );

}

export default ResponseCheck;