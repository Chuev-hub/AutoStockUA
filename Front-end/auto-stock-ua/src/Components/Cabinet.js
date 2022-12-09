import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";

class Cabinet extends React.Component {
  constructor(props) {
     super(props);
      console.log(this.props)
    this.state = {
      user: this.props.user,
      show:false,
      message:"",
      variant:''
    };
    this.saveChanges= this.saveChanges.bind(this)
    this.changePic= this.changePic.bind(this)
    this.ChangePassword= this.ChangePassword.bind(this)
  }
  componentDidMount() {
  }
  ChangePassword(){
    let obj = JSON.parse(sessionStorage.getItem("user"));
    fetch("https://localhost:7102/Account/ChangePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
        oldPassword:document.getElementById("inputOldPassword").value,
        newPassword:document.getElementById("inputNewPassword").value,
      },
      body:JSON.stringify(this.state.user)
    })
      .then(async (res)=>{
        if(res.status == 200){
          this.setState(s=>{return {...s,variant:'success', show:true,message:"Password changed"}})
          document.getElementById("inputOldPassword").value= ""
          document.getElementById("inputNewPassword").value=""
          this.props.refreshData();
   
        }
        else{
          let x = await res.json()
          if(x.length>0)
           this.setState(s=>{return {...s, message:x[0],show:true,variant:'danger'}})
          else{
            this.setState(s=>{return {...s,show:false}})
            this.props.refreshData();
          }
        }
      })
  }
  componentWillReceiveProps(props) {
    this.setState((s)=>{return { ...s, user: props.user }})
  }
  changePic(evt) {
    const file = evt.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      let base64 =  fileReader.result;
      let obj = JSON.parse(sessionStorage.getItem("user"));
      console.log(JSON.stringify({Email:obj.user.email, Avatar:base64}))
      console.log("bearer " + obj.token)
    fetch("https://localhost:7102/Account/ChangeAvatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      },
      body:JSON.stringify({Email:obj.user.email, Avatar:base64})
    })
      .then(()=>{
        this.props.refreshData();
      })
    }
}
saveChanges(){
  let obj = JSON.parse(sessionStorage.getItem("user"));
  fetch("https://localhost:7102/Account/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      },
      body:JSON.stringify(this.state.user)
    })
      .then(async (res)=>{
        if(res.status == 200){
          this.setState(s=>{return {...s,show:true,message:"Data changed",variant:'success'}})
          this.props.refreshData();
        }
        else{
          let x = await res.json()
          if(x.length>0)
           this.setState(s=>{return {...s, message:x[0],show:true,variant:'danger'}})
          else{
            this.setState(s=>{return {...s,show:false}})
            this.props.refreshData();
          }
        }
      })
}

  render() {
    const {t} = this.props
        
    return (
        <>
          <div style={{marginTop:"30px"}} className="container-xl px-4  ">
    <div className="row">
        <div className="col-12">
        <Alert show={this.state.show}  variant={this.state.variant}>
                                    {this.state.message}
                      </Alert>
                      
            <div className="card mb-4">
                <div className="card-header">{t('accountDetails')}</div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className=" mb-1" for="inputUsername">{t('username')} </label>
                            <input className="form-control" id="inputUsername" type="text"
                             onChange={(x)=>{this.setState((s)=>{ s.user.userName = x.target.value; return s })}} 
                              placeholder={t('enterUsername')} value={this.state.user.userName}/>
                        </div>
                       
                    
                        <div className="mb-3">
                            <label className=" mb-1" for="inputEmailAddress">{t('email')}</label>
                            <input className="form-control" id="inputEmailAddress"   type="email" placeholder={t('enterEmail')} 
                             onChange={(x)=>{if(sessionStorage.getItem("isGoogle")!='true'){this.setState((s)=>{ s.user.email = x.target.value; return s })}}} 
                            value={this.state.user.email} />
                        </div>
                        <div className=" mb-3">
                                <label className=" mb-1" for="inputPhone">{t('phoneNumber')}</label>
                                <input className="form-control" id="inputPhone" type="tel"
                                 onChange={(x)=>{this.setState((s)=>{ s.user.phoneNumber = x.target.value; return s })}} 
                                  placeholder={t('enterPhone')} value={this.state.user.phoneNumber}/>
                        </div>
                        
                        <div className="d-flex w-100 justify-content-center">
                        <button style={{ margin:"auto",alignSelf:"center"}} className="w-50 btn btn-outline-dark" onClick={this.saveChanges} type="button">{t('saveChanges')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      
        <div className="col-12">
            <div className="card  mb-4 ">
                <div className="card-header">{t('profilePicture')}</div>
                <div className="card-body text-center  mb-2">
                 <input class="form-control"  accept="image/*" onChange={this.changePic} type="file" id="formFile"/>
                </div>
            </div>
        </div>
        {
          sessionStorage.getItem("isGoogle")!="true"&&
  <div className="col-12">
  <div className="card mb-5">
     <div className="card-header">{t('changePassword')}</div>
      <div className="card-body">
          <form>
              <div className="mb-3">
                  <label className=" mb-1" for="inputOldPassword">{t('oldPassword')} </label>
                  <input className="form-control" id="inputOldPassword" type="password" placeholder={t('enterOldPassword')} />
              </div>
             
          
              <div className="mb-3">
                  <label className=" mb-1" for="inputNewPassword">{t('newPassword')}</label>
                  <input className="form-control" id="inputNewPassword"   type="password" placeholder={t('enterNewPassword')}  />
              </div>
              <div className="d-flex w-100 justify-content-center">
              
              <button style={{ margin:"auto",alignSelf:"center"}} onClick={this.ChangePassword} className="w-50 btn btn-outline-dark" type="button">{t('change')}</button>
              </div>
          </form>
      </div>
  </div>
</div>

        }
      
    </div>
</div>
      </>
    );
  }
}
export default Cabinet;