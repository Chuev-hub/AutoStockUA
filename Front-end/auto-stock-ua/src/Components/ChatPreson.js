import React, { Component } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

class ChatPerson extends Component {
  constructor(props) {
    super(props);
    this.me=JSON.parse(sessionStorage.getItem("user")).user
    this.first = true
    this.state = {
      nick: '',
      message: '',
      messages: [],
      
      hubConnection: null,
    };
    this.sendMessageEnter = this.sendMessageEnter.bind(this)
  }
  sendMessageEnter(e){
    if(e.key === 'Enter') {
      this.state.hubConnection
      .invoke('sendMessageToGroup', this.state.nick,this.me.id.toString(),this.state.chat.id.toString(), this.state.message)
      .catch(err => console.error(err));

      this.setState((x)=>{return{...x,message: ''}});      
  }
  }
  componentWillReceiveProps(props) {
    if(props.user!=undefined){

    if(props.user?.id != this.state.chat?.id){
      const nick = JSON.parse(sessionStorage.getItem("user")).user.userName;
if(this.first){
  this.first = false
      const hubConnection = new HubConnectionBuilder().withUrl('https://localhost:7102/chatHub', {
        withCredentials: false
    }).build();    
  
      this.setState({ hubConnection, nick }, () => {
        this.state.hubConnection
          .start()
          .then(() => {
            
            hubConnection.invoke('joinGroup', props.user.id.toString())
            .catch(err => console.error(err));
            this.setState(x=>{return {...x,chat:props.user}})
            console.log('Connection started!')})
          .catch(err => console.log('Error while establishing connection :('));
  
        this.state.hubConnection.on('ReceiveMessage', (nick, receivedMessage) => {
          console.log(2)
          const text = `${nick}: ${receivedMessage}`;
          const messages = this.state.messages.concat([text]);
        this.setState((x)=>{return{...x,messages: messages}});      
  
        });
      });
 
} else{
  this.state.hubConnection.invoke('joinGroup', props.user.id.toString())
  .catch(err => console.error(err));
  this.setState(x=>{return {...x,chat:props.user}})
}

  }


    if(props.user.users.find(c=>c.id!=this.me.id)?.id!=this.state.user?.id){
      this.setState(x=>{return {...x,user:props.user.users.find(c=>c.id!=this.me.id),messages:[]}})

  }
  }
}

  componentDidMount = () => {
    if(this.props.user){

    this.setState(x=>{return {...x,user:this.props.user}})
  
    }

  };

  sendMessage = () => {

    this.state.hubConnection
      .invoke('sendMessageToGroup', this.state.nick,this.me.id.toString(),this.state.chat.id.toString(), this.state.message)
      .catch(err => console.error(err));

      this.setState((x)=>{return{...x,message: ''}});      
  };

  render() {
    return (
      <>
         {this.state.user ?
       <div className="d-flex flex-column justify-content-end" style ={{width:"500px",height:"600px",backgroundColor:"rgba(48, 48, 48, 0.316)"}}>
        
        <div >
         {this.state.messages.map((message, index) => (
           <span style={{display: 'block'}} key={index}> {message} </span>
         ))}
       </div> 
         <div className="input-group mb-3">
  <input type="text" className="form-control" onKeyDown={this.sendMessageEnter}  value={this.state.message}
         onChange={e => this.setState({ message: e.target.value })} placeholder="Написати..." />
  <div className="input-group-append">
    <button onClick={this.sendMessage} className="btn btn-outline-secondary" type="button">Надіслати</button>
  </div>
</div>





       </div> :
       <div style ={{width:"500px"}}>
       </div>
         
         }
       
        </>
        
       
    );
  }
}

export default ChatPerson;
