import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Cabinet from "./Cabinet";
import Favourites from "./Favourites";
import MyAdd from "./MyAdd";
import MyComments from "./MyComments";
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { withTranslation } from "react-i18next";

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
    const { t } = this.props;
    return (
        <>
        <Link to='/' id="redirect"></Link>
      
      <div className="d-flex justify-content-center mt-5" >
        <div className="d-flex flex-column align-items-center justify-content-center" >
        <img style={{width:"100px",border: "1px solid black", borderRadius:"50%"}} src={require("../default-user-image.png")}></img>
        <div>User</div>
        <Link className="m-2 mt-4 w-100 btn btn-outline-success" >
        <div className="d-flex justify-content-start">
            <FontAwesomeIcon style={{marginRight:"10px",marginTop:"5px"}} className="myicon " icon={icon({name: 'plus',style: 'solid' })} />
           <div className="d-flex justify-content-center"> {t('CreateAdvertisement')}</div></div>
            </Link>
        <Link className="m-2 mt-3 w-100 btn btn-outline-primary" to=''>
        <div className="d-flex justify-content-start"> <FontAwesomeIcon style={{marginRight:"10px",marginTop:"5px"}} className="myicon " icon={icon({name: 'user',style: 'regular' })} />
        <div className="d-flex justify-content-center">   {t('personalAccount')}</div></div></Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='favourites'>
        <div className="d-flex justify-content-start"> <FontAwesomeIcon style={{marginRight:"10px",marginTop:"5px"}} className="myicon " icon={icon({name: 'heart',style: 'regular' })} />
        <div className="d-flex justify-content-center">   {t('favourites')}</div></div></Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='myadd'>
        <div className="d-flex justify-content-start"> <FontAwesomeIcon style={{marginRight:"10px",marginTop:"5px"}} className="myicon " icon={icon({name: 'clipboard',style: 'regular' })} />
        <div className="d-flex justify-content-center">  {t('myAdvertisements')}</div></div></Link>
        <Link className="m-2 w-100 btn btn-outline-primary" to='mycomments'>
        <div className="d-flex justify-content-start"> <FontAwesomeIcon style={{marginRight:"10px",marginTop:"5px"}} className="myicon " icon={icon({name: 'comment',style: 'regular' })} />
        <div className="d-flex justify-content-center">   {t('myComments')}</div></div></Link>
        <Button onClick={()=>this.logout()} variant="outline-danger" className="m-2 mt-4 w-100" >{t('logout')}</Button>
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
export default withTranslation()(Account);