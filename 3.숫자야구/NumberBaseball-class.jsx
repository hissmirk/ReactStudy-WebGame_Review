import React, { Component } from 'react';

import Try from "./Try-class";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    const { value, answer, tries } = this.state; // 구조분해
    console.log('tries.length : ' + tries.length);
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: 'Home run! ' + answer.join('') + ' ⚾',
          tries: [...tries, { try: value, result: 'Home run!' }],
        }
      });
      alert('Restart.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.focus();
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `Failed! ${answer.join('')}`,
        });
        alert('Restart.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
          this.setState((prevState) => {
            return {
              tries: [...prevState.tries, { try: value, result: `${strike} Strike, ${ball} Ball` }],
              value: '',
            };
          });
          this.inputRef.focus();
        }
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  inputRef;
  onInputRef = (c) => { this.inputRef = c;}

  render() {
    const { result, value, tries } = this.state; // 구조분해
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onInputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
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
}

export default NumberBaseball;