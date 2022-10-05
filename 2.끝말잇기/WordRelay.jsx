const React = require('react');
const { useState, useRef } = require("react");

const WordRelay = () => {
  const [word, setWord] = useState('어드민');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setWord((prevWord) => {
        return value;
      })
      setResult('⭕');
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('❌');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput"></label>
        <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput}/>
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordRelay;