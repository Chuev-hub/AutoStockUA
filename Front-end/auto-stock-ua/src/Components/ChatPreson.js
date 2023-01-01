import React, { Component } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

class ChatPerson extends Component {
  constructor(props) {
    super(props);
    this.me=JSON.parse(sessionStorage.getItem("user")).user
    this.first = true
    this.wasScrolled =false
    this.state = {
      nick: '',
      message: '',
      messages: [],
      
      hubConnection: null,
    };
    this.sendMessageEnter = this.sendMessageEnter.bind(this)
    this.Scrolling = this.Scrolling.bind(this)
  }
  Scrolling(){
    if(document.getElementById("scrollplace").scrollTop==0)
    fetch('https://localhost:7102/Account/GetMessages?chatId='+this.state.chat.id+'&last='+this.state.messages[0].id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + JSON.parse(sessionStorage.getItem("user")).token,
      },
    }).then(res=>res.json()).then(x=>
    {
      let messagesArr = x.concat(this.state.messages)
      this.wasScrolled = true
       this.setState((x)=>{return{...x,messages: messagesArr}});
    }
    )
  }
  async sendMessageEnter(e){
    if(e.key === 'Enter') {
    this.state.hubConnection
        .invoke('sendMessageToGroup', this.state.nick,this.me.id.toString(),this.state.chat.id.toString(), this.state.message)
        .catch(err => console.error(err));
  
        await this.setState((x)=>{return{...x,message: ''}});   
       
  }
  }
  componentDidUpdate(){
    if(!this.first&&!this.wasScrolled){

      let obj = document.getElementById("scrollplace")
      obj.scrollTop = obj?.scrollHeight
      obj.animate({scrollTop: obj.scrollHeight}, 500);
    }
this.wasScrolled = false
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
  
        this.state.hubConnection.on('ReceiveMessage', async (nick, receivedMessage) => {

          let messagesArr = this.state.messages;
          messagesArr.push(receivedMessage)
        await this.setState((x)=>{return{...x,messages: messagesArr}});      
       
     
        });
      });
 
} else{
  this.state.hubConnection.invoke('joinGroup', props.user.id.toString())
  .catch(err => console.error(err));
  this.setState(x=>{return {...x,chat:props.user}})
}
fetch('https://localhost:7102/Account/GetMessages?chatId='+props.user.id, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + JSON.parse(sessionStorage.getItem("user")).token,
  },
}).then(res=>res.json()).then(x=>
{
  console.log(x)
  console.log(this.state.messages)

  let messagesArr = this.state.messages.concat(x);
  console.log(messagesArr)

   this.setState((x)=>{return{...x,messages: messagesArr}});
}
)
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

  sendMessage = async () => {
  this.state.hubConnection
      .invoke('sendMessageToGroup', this.state.nick,this.me.id.toString(),this.state.chat.id.toString(), this.state.message)
      .catch(err => console.error(err));

      await this.setState((x)=>{return{...x,message: ''}});   

  };

  render() {
    return (
      <>
         {this.state.user ?
       <div className="d-flex flex-column justify-content-end m-5" style ={{width:"500px", height:"500px", backgroundColor:"rgba(48, 48, 48, 0.216)"}}>
        
        <div className="d-flex flex-column" id="scrollplace" onScroll={this.Scrolling} style ={{overflowY:"scroll"}}>
         {this.state.messages.map((message) => {
          
          if(message.userId==this.me.id)
          return  <div  style={{display: 'block', textAlign:"end" }} key={message.id} className=" m-2 align-self-end">
        <h6 style={{display: 'block',textAlign:"end", marginRight:"8px"}} 
       > You </h6>
       <div style={{backgroundColor:"rgba(48, 48, 48, 0.216)", borderRadius:"5px", padding:"8px"}} >
            <div style={{display: 'block',textAlign:"end",fontSize:"18px" }} 
       > {message.content} </div>
         <div style={{display: 'block',textAlign:"end",fontSize:"12px" }} 
       > {new Date(message.date).toUTCString().slice(0,-7)} </div></div>
     </div>
          
        else 
        return  <div  style={{display: 'block', textAlign:"end" }} key={message.id} className=" m-2 align-self-start">
        <h6 style={{display: 'block', marginLeft:"8px"}} 
       > {this.state.user.userName}  </h6>
       <div style={{backgroundColor:"rgba(48, 48, 48, 0.216)", borderRadius:"5px", padding:"8px"}} >
            <div style={{display: 'block',fontSize:"18px" }} 
       > {message.content} </div>
         <div style={{display: 'block',fontSize:"12px" }} 
       > {new Date(message.date).toUTCString().slice(0,-7)} </div></div>
     </div>
        
        

       
        })}
       </div> 
         <div className="input-group mt-3">
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
