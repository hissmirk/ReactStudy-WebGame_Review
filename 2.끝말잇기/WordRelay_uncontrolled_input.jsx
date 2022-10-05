const React = require('react');
const { useState, useRef } = require("react");

const WordRelay = () => {
  const [word, setWord] = useState('비제어');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.dir(e.target.children.wordInput.value);
    if (word[word.length - 1] === e.target.children.wordInput.value[0]) {
      setWord(e.target.children.wordInput.value);
      setResult('⭕');
      e.target.children.wordInput.value = '';
      inputRef.current.focus();
    } else {
      setResult('❌');
      e.target.children.wordInput.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput"></label>
        <input id="wordInput" className="wordInput" ref={inputRef}/>
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordRelay;