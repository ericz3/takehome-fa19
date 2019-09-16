import React, { Component } from 'react'

class Counter extends Component {
  // YOUR CODE GOES BELOW
  constructor(props){
    super(props);
    this.state = {count: (props.count ? props.count : 0)};
  }

  increaseCount = () => {
     this.setState({
        count:this.state.count+1
     });
  }

  decreaseCount = () => {
    this.setState({
      count:this.state.count-1
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick = {this.increaseCount}>
          Increase Count
        </button>
        <button onClick = {this.decreaseCount}>
          Decrease Count
        </button>
      </div>
    )
  }
}

export default Counter
