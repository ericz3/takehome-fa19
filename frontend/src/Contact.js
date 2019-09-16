import React, { Component } from 'react'

class App extends Component {
  // YOUR CODE GOES BELOW
  constructor(props){
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.nickname = props.nickname;
    this.hobby = props.hobby;
  }
  render() {
    return (
      <div>
        <h2>{this.name}</h2>
      </div> 
    )
  }
}

export default App
