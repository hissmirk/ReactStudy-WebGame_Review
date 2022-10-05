import React, { Component } from 'react';

function getNumbers() {

}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = () => {

  };

  onChangeInput = () => {

  }

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {['like1', 'like2', 'like3', 'like4', 'like5'].map((v, index) => {
            return (
              <li key={index}>{v}</li>
            );
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball;