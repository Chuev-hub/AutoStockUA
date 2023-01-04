import React, { Component } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ChatPerson from './ChatPreson';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.me=JSON.parse(sessionStorage.getItem("user")).user
    this.state = {
      nick: '',
      message: '',
      messages: [],
      chats:[],
      hubConnection: null,
    };
    this.ChangeUser =this.ChangeUser.bind(this)
  }
  ChangeUser(chat){
    this.setState(x=>{return {...x,chat:chat}})
  }
  componentDidMount = () => {
    let obj = JSON.parse(sessionStorage.getItem("user"));

    fetch("https://localhost:7102/Account/GetChats/"+obj.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      },
    }).then(async(res) => {
      if(res.ok){
      let data = await  res.json()

      this.setState(x=>{return {...x,chats:data}})
    }
  })

 
  };

  

  render() {
    return (
      <div>
        {this.state.chats==null?
<div className='d-flex justify-content-center'>

  <h1>Ви не маєте чатів</h1>

</div>


:
        
<div className='d-flex justify-content-center'>
<div>
<h5 className="mt-5">{"Hello, "+this.me.userName}</h5>
<div className="list-group mt-5" style={{width:"250px"}}>

        {this.state.chats?.map((x, i)=>
        <button key={x.id} id={x.id} onClick={()=>{this.ChangeUser(x)}}
        className={i==0?"d-flex list-group-item align-items-center list-group-item-dark list-group-item-action ":
        "list-group-item d-flex align-items-center list-group-item-dark list-group-item-action "} >
          
          <img
              style={{
                width: "50px",
                height:"50px",
                marginRight:"20px",
                objectFit: 'cover',
                border: "1px solid black",
                borderRadius: "50%",
              }}
              src={!x.users?.find(d=>d.id!=this.me.id).avatar?require("../default-user-image.png"):x.users?.find(d=>d.id!=this.me.id).avatar}
            ></img>
        <h6>  {x.users?.find(d=>d.id!=this.me.id).userName}</h6>
        </button>
        )}
      </div>
      </div>
        <ChatPerson user={this.state.chat}></ChatPerson>
        {/* <br />
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />

        <button onClick={this.sendMessage}>Send</button>

        <div>
          {this.state.messages.map((message, index) => (
            <span style={{display: 'block'}} key={index}> {message} </span>
          ))}
        </div> */}
      </div>
        }
      </div>
        
       
    );
  }
}

export default Chat;
