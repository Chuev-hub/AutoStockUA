import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Cabinet from "./Cabinet";
import Favourites from "./Favourites";
import MyAdd from "./MyAdd";
import MyComments from "./MyComments";
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

class Account extends React.Component {
  constructor(props) {
     super(props);
    // this.root= null
    // this.state = {
    //    root:{}
    // };
    this.logout = this.logout.bind(this)
  }
  componentDidMount() {
    console.log(sessionStorage.getItem("user"))
    
    if(sessionStorage.getItem("isSigned")!="true")
     document.getElementById('redirect').click();

  }
  logout(){
    sessionStorage.setItem("user","")
    sessionStorage.setItem("isSigned","false")
    this.props.check();
    document.getElementById('redirect').click();
  }


  render() {
    return (
        <>
        <Link to='/' id="redirect"></Link>
      
      <div className="d-flex justify-content-center mt-5" >
        <div className="d-flex flex-column align-items-center justify-content-center" >
        <img style={{width:"100px",border: "1px solid black", borderRadius:"50%"}} src={require("../default-user-image.png")}></img>
        <div>User</div>
        <Link className="m-2 mt-4 w-100 btn btn-outline-primary" to=''>Особистий кабінет</Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='favourites'>Обране</Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='myadd'>Мої оголошення</Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='mycomments'>Мої коментарі</Link>
        <Button onClick={()=>this.logout()} variant="outline-danger" className="m-2 w-100" >Вийти</Button>
        </div>
        <div style={{width:"400px"}}>

    <Routes>
      <Route path="" element={<Cabinet />} />
      <Route path="favourites" element={<Favourites/>} />
      <Route path="myadd" element={<MyAdd />} />
      <Route path="mycomments" element={<MyComments />} />
    </Routes>
    </div>
    </div>
    
         
           
   
      </>
    );
  }
}
export default Account;