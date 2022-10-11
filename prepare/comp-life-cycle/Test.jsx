import React, { Component } from "react";

class Test extends Component {
  state = {
    counter: 0,
    string: '',
    number: 1,
    boolean: true,
    object: { a: 'b', c: 'd' },
    array: [],
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter != nextState.counter) {
      return true;
    }
    return false;
  }

  onClick = () => {
    this.setState({
      counter : 1,
    });
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}

export default Test;