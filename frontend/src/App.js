import React, { Component } from 'react'
import Instructions from './Instructions'
import Contact from './Contact'
import Counter from './Counter';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      new_name: '', 
      new_nickname: '', 
      new_hobby: '',
      contacts: [
        {id: 1, name: "Angad", nickname: "greg", hobby: "dirty-ing"},
        {id: 2, name: "Roy", nickname: "uwu", hobby: "weeb"},
        {id: 3, name: "Daniel", nickname: "oppa", hobby: "losing money with options trading"},
      ]
    };
    this._child = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  addContact = () =>{
    let new_id = this.state.contacts.length + 1;
    let uContacts = this.state.contacts;
    let new_contact={id:0, name: "", nickname: "", hobby: ""};
    new_contact.id = new_id;
    new_contact.name = this.state.new_name;
    new_contact.nickname = this.state.new_nickname;
    new_contact.hobby = this.state.new_hobby;
    uContacts.push(new_contact);
    this.setState({
      contacts: uContacts
    });
    this._child.current.increaseCount();
  }

  render() {
    let disabled = (this.state.new_name.length===0 
      || this.state.new_nickname.length===0 
      || this.state.new_hobby.length===0);
    return (
      <div className="App">
        <Instructions complete={true}/>

        <Counter count={this.state.contacts.length} ref={this._child}/>

        {this.state.contacts.map(x => (
          <Contact id={x.id} name={x.name} nickname={x.nickname} hobby={x.hobby} />
        ))}

        <form onSubmit>
          <label >name</label>
          <input
            type="text"
            name="new_name"
            value={this.state.new_name}
            onChange={this.handleChange}
          />
          <label >nickname</label>
          <input
            type="text"
            name="new_nickname"
            value={this.state.new_nickname}
            onChange={this.handleChange}
          />
          <label >hobby</label>
          <input
            type="text"
            name="new_hobby"
            value={this.state.new_hobby}
            onChange={this.handleChange}
          />
          <button disabled={disabled} type = "button" onClick = {this.addContact} >
            Add Contact
          </button>
        </form>
      </div>
    )
  }
}

export default App
