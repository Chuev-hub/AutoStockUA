
import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { withTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
class CardCar extends React.Component {
  constructor(props) {
    super(props);
    this.root= null
    this.state = {
       car:{},
       user:{},
       showPhone:false
    };
    this.Write = this.Write.bind(this)
  }
  
  componentDidMount() { 
    fetch("https://localhost:7102/Advertisement/get/"+window.location.href.split('/').pop(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async(res) => {
        let data = await  res.json()
        fetch("https://localhost:7102/Account/get/"+data.owner.id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async(res2) => {
            let data2 = await  res2.json()
            console.log(data)
            console.log(data2)
            this.setState((x)=>{return{...x,user:data2,car:data}})
          })
      })
  }
  Write(){
    let obj = JSON.parse(sessionStorage.getItem("user"));

    fetch("https://localhost:7102/Account/CreateChat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + obj.token,
        },
        body:JSON.stringify([{id:obj.user.id,email:"111",password:"111"},{id:this.state.car.owner.id,email:"111",password:"1111"}])
      }).then(async(res) => {
        if(res.ok){
          document.getElementById("successredirect").click();
        }
       
      })
  }
  render() {
    const { t } = this.props;
    return <>
    <Link id="successredirect" to='/chat'></Link>
     <div style={{marginLeft: "150px"}} className="mt-5 d-flex  justify-content-start" >
     <div style={{width: "150px"}} className=" m-5 align-items-center d-flex flex-column" >
     <img
              style={{
                width: "90px",
                height:"90px",
                objectFit: 'cover',
                border: "1px solid black",
                borderRadius: "50%",
              }}
              src={this.state.user.avatar==null?require("../default-user-image.png"):this.state.user.avatar}
            ></img>
<div>{this.state.user?.userName}</div>
{this.state.user?.phoneNumber!=null&&this.state.user?.phoneNumber!=''&&
<div>{this.state.showPhone?
<h6 className="mt-1">{this.state.user?.phoneNumber}</h6>:
 <Button onClick={()=>this.setState(x=>{return {...x, showPhone:true}})} className="mt-2" variant="outline-dark">Показати номер</Button>
}</div>
  }
     <Button style={{ width:"100%"}} onClick={this.Write} className="mt-2" variant="outline-dark">
        
        Написати!</Button>
     </div>
     <div  className="   d-flex flex-column" >

     <h3>{this.state.car?.brand?.name +" "+ this.state.car?.model?.name+ " "+ this.state.car?.year}</h3>

     <Carousel  style={{width:"600px"}}>
                   
                   {this.state.car?.images?.map(x=> 
                    <Carousel.Item key={x.id}>
                    <img
                    className="d-block w-100"
                    src={x.imageData}
                    alt="First slide"
                   
                    />
                </Carousel.Item>

)}
  
               </Carousel>

     </div>
     </div>

    </>
    

  }
}
export default withTranslation()(CardCar) ;

