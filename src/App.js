import React, { Component } from 'react';

class App extends Component {

  constructor(){
    super();
    this.state = {
      message:'',
      messages : [

      ]
    }
  }
  handleSubmit(e){
    e.preventDefault();
    const newMessage={
      id: this.state.messages.length,
      text:this.state.message
    };

    window.firebase.database().ref(`messages/${newMessage.id}`).set(newMessage);
    this.setState({message:''});
  }
  updateMessage(e){
    this.setState({message:e.target.value});
    console.log(this.state.message);
  }
  componentDidMount(){
    window.firebase.database().ref('messages/').on('value',snap=>{
      const currentessages = snap.val();
      if(currentessages !== null){
        this.setState({messages:currentessages});
      }

    });
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
