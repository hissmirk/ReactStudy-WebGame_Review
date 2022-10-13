import React, { Component } from "react";

// 클래스의 경우 : constructor -> render -> ref -> componentDidMount ->
// setState 또는 props 바뀔 때 -> render -> shouldComponentUpdate(true) -> componentDidUpdate
// 상위 컴포넌트에서 하위 컴포넌트를 없앨 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  }

  interval;

  changeHandInterval = () => {
    this.interval = setInterval(this.changeHand, 1000);
  }

  // 컴포넌트 첫 렌더링 후, 여기에 비동기 요청을 많이 한다.
  componentDidMount() {
    this.changeHandInterval();
  }

  // 컴포넌트 리렌더링 후,
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  // 컴포넌트가 제거되기 직전, 여기서 비동기 요청 정리를 많이 한다.
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
      const { imgCoord } = this.state; // 비동기 바깥에 객체를 참조하면 클로저 문제가 생길 수 있다.
      if (imgCoord === rspCoords.바위) {
        this.setState({
          imgCoord: rspCoords.가위,
        });
      } else if (imgCoord === rspCoords.가위) {
        this.setState({
          imgCoord: rspCoords.보,
        });
      } else if (imgCoord === rspCoords.보) {
        this.setState({
          imgCoord: rspCoords.바위,
        });
      }
  };

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: 'DRAW',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: 'WIN',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: 'LOSE',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.changeHandInterval();
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>RESULT:{result}</div>
        <div>SCORE :{score}</div>
      </>
    );
  }
}

export default RSP;