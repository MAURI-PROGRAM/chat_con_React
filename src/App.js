import React, { Component } from 'react';

class App extends Component {

  constructor(){
    super();
    this.state = {
      message:'',
      messages : [
        {id:0,text:"Hola1"},
        {id:1,text:"Hola2"},
        {id:2,text:"Hola3"},
      ]
    }
  }
  handleSubmit(e){
    e.preventDefault();
    const list = this.state.messages;
    const newMessage={
      id: this.state.messages.length,
      text:this.state.message
    }
    list.push(newMessage);
    this.setState({messages:list});
    this.setState({message:''});
  }
  updateMessage(e){
    this.setState({message:e.target.value});
    console.log(this.state.message);
  }
  render() {
    const {messages}= this.state;
    const messagesList = messages.map(message=>{
      return <li key={message.id}>{message.text}</li>
    });
    return (
      <div>
         <ul>
        {messagesList}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input value={this.state.message} type="text" onChange={this.updateMessage.bind(this)}/>
          <button>send</button>
        </form>
      </div>
     
    );
  }
}

export default App;
