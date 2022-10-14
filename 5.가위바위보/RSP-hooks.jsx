import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  ROCK: '0',
  SCISSOR: '-142px',
  PAPER: '-284px',
};

const scores = {
  SCISSOR: 1,
  ROCK: 0,
  PAPER: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.ROCK);
  const [score, setScore] = useState('');
  const interval = useRef(null);

  const changeHandInterval = () => {
    interval.current = setInterval(changeHand, 500);
  }

  useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
    changeHandInterval();
    return () => { // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]);


  const changeHand = () => {
    if (imgCoord === rspCoords.ROCK) {
        setImgCoord(rspCoords.SCISSOR);
    } else if (imgCoord === rspCoords.SCISSOR) {
        setImgCoord(rspCoords.PAPER);
    } else if (imgCoord === rspCoords.PAPER) {
        setImgCoord(rspCoords.ROCK);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScores= scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScores;
    if (diff === 0) {
      setResult('DRAW!');
    } else if ([-1, 2].includes(diff)) {
      setResult('WIN!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('LOSE.');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      changeHandInterval();
    }, 1000)
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('ROCK')}>ROCK</button>
        <button id="scissor" className="btn" onClick={onClickBtn('SCISSOR')}>SCISSOR</button>
        <button id="paper" className="btn" onClick={onClickBtn('PAPER')}>PAPER</button>
      </div>
      <div>RESULT: {result}</div>
      <div>SCORE : {score}</div>
    </>
  )

}

export default RSP;