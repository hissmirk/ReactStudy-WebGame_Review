import React, { useRef, useState } from "react";

import Try from "./Try-hooks";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const inputRef = useRef();

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log('answer : ' + answer);
    if (value === answer.join('')) {
      setResult('Home run! ' + answer.join('') + ' ⚾');
      setValue('');
      setAnswer(getNumbers());
      setTries([...tries, { try: value, result: 'Home run! ⚾' }]);
      setTimeout(sayAgain, 1000);
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 완전 실패
        setResult((prevState) => {
          return 'Failed! Answer: ' + answer.join('');
        });
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        setTimeout(sayAgain, 3000);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries([...tries, { try: value, result: `${strike} Strike, ${ball} Ball` }]);
        setValue('');
        inputRef.current.focus();
      }
    }
  };

  const sayAgain = () => {
    alert('Try again!');
    setResult('');
    setTries([]);
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput}/>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return (
            <Try key={`${i + 1}차 시도 :`} tryInfo={v} index={i}/>
          );
        })}
      </ul>
    </>
  )
}

export default NumberBaseball;