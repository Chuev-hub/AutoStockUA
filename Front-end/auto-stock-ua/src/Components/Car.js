
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
       showPhone:false,
       mine:false
    };
    this.Write = this.Write.bind(this)
    this.Deactivate = this.Deactivate.bind(this)
  }
  Deactivate(){
    let obj = JSON.parse(sessionStorage.getItem("user"));
    console.log(obj.token)
    fetch("https://localhost:7102/Advertisement/Active/"+this.state.car.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      }
     
    }).then(async(res) => {
      console.log(res)
      if(res.ok==true){
        fetch("https://localhost:7102/Advertisement/get/"+this.state.car.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
     
    }).then(res2=>res2.json()).then(s=>{
      this.setState(xx=>{return {...xx,car:{...xx.car,isActual:s.isActual}}})
    })
      }
    })
  }
  componentDidMount() { 

    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(res=>{return res.json();}).then(d=>{
    
     this.setState((s)=>{return { ...s, rate:d.find(cc=>cc.cc=='USD').rate }})
   }
   )
    
    
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
            if(sessionStorage.getItem("user")!="")
            this.setState((x)=>{return{...x,user:data2,car:data,mine:JSON.parse(sessionStorage.getItem("user"))?.user?.id == data.owner.id}})
            else
            this.setState((x)=>{return{...x,user:data2,car:data}})
          })
      })
  }
  Write(){
    if(sessionStorage.getItem("isSigned") != "true")
      document.getElementById("redirect").click();

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
    <Link id="redirect" to={'/signin?redirect='+this.state.car?.id}></Link>
    
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
<h6 className="mt-1">{this.state.user?.phoneNumber}</h6>
:
 <Button onClick={()=>this.setState(x=>{return {...x, showPhone:true}})} className="mt-2 w-100" variant="outline-dark">Показати номер</Button>
}</div>
  }
      {this.state.mine?
      <div>
          <Button onClick={()=>this.Deactivate()} className="mr-2 mt-2 w-100" variant={this.state.car?.isActual?"outline-danger":"outline-success"}> 
   {this.state.car?.isActual?"Деактивувати":"Активувати"} 
      </Button>
      </div>
      :
      <Button  onClick={this.Write} className="mt-2" variant="outline-dark">
        Написати!</Button>

      }
        
     </div>
     <div  className="   d-flex flex-column" >

     <h3>{this.state.car?.brand?.name +" "+ this.state.car?.model?.name+ " "+ this.state.car?.year}</h3>

<div style={{width:"650px",height:"400px",backgroundColor:"rgba(48, 48, 48, 0.216)"}}>

     <Carousel  variant="dark" >
                   
                   {this.state.car?.images?.map(x=> 
                    <Carousel.Item key={x.id}>
                    <img
                    
                    className="d-block "
                    src={x.imageData}
                    style={{height:"400px", margin:"auto"}}
                    />
                </Carousel.Item>

)}
  
               </Carousel>

</div>

  <h3> {'$'+this.state.car.price}</h3>
  <h6> {'UAH '+Math.round(this.state.car.price*this.state.rate).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h6>
  <div className="d-flex">
  <div className="d-flex flex-column">
  <div className="d-flex">
    <h6>{t('conditionType')}</h6>
    <div> {": "+this.state.car.conditionType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('accidentStatus')}</h6>
    <div> {": "+this.state.car.accidentStatus?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('bodyType')}</h6>
    <div> {": "+this.state.car.bodyType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('engineType')}</h6>
    <div> {": "+this.state.car.engineType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('color')}</h6>
    <div> {": "+this.state.car.color?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('country')}</h6>
    <div> {": "+this.state.car.country?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('driveType')}</h6>
    <div> {": "+this.state.car.driveType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('engineType')}</h6>
    <div> {": "+this.state.car.engineType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('gearboxType')}</h6>
    <div> {": "+this.state.car.gearboxType?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('numberOfDoors')}</h6>
    <div> {": "+this.state.car.numberOfDoors?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('numberOfPlaces')}</h6>
    <div> {": "+this.state.car.numberOfPlaces?.name}</div>
     </div>
     <div className="d-flex">
    <h6>{t('region')}</h6>
    <div> {": "+this.state.car.region?.name}</div>
     </div>
     </div>
     <div style={{width:"400px", marginLeft:"15px"}}>
   {this.state.car.about}
     </div>
     </div>
    
   
     </div>

     </div>

    </>
    

  }
}
export default withTranslation()(CardCar) ;

