import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import CardCar from "./CardCar";
class MyAdd extends React.Component {
  constructor(props) {
    super(props);
    this.root= null
    this.state = {
       root:{},
       adArray:[]
    };
   this.Deactivate = this.Deactivate.bind(this)
   this.Edit = this.Edit.bind(this)
   this.Delete = this.Delete.bind(this)
  }
  Delete(id){
  let obj = JSON.parse(sessionStorage.getItem("user"));
  fetch("https://localhost:7102/Advertisement/Delete/"+id, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + obj.token,
    }
   
  }).then(async(res) => {
    if(res.ok==true){
      fetch("https://localhost:7102/Account/GetAdvertisements/"+obj.user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + obj.token,
        }
       
      }).then(async(res) => {
        
        let data = await  res.json()
        console.log(data)
        if(data.length>0)
         this.setState((x)=>{return{...x,adArray:data }})
      })
    }
  })
}
  Edit(id){

  }
  Deactivate(id){
    let obj = JSON.parse(sessionStorage.getItem("user"));
    console.log(obj.token)
    fetch("https://localhost:7102/Advertisement/Active/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      }
     
    }).then(async(res) => {
      if(res.ok==true){
        fetch("https://localhost:7102/Account/GetAdvertisements/"+obj.user.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + obj.token,
          }
         
        }).then(async(res) => {
          
          let data = await  res.json()
          console.log(data)
          if(data.length>0)
           this.setState((x)=>{return{...x,adArray:data }})
        })
      }
    })
  }
  componentDidMount() { 
    let obj = JSON.parse(sessionStorage.getItem("user"));

console.log("https://localhost:7102/Account/GetAdvertisements/"+obj.user.id)
console.log('bearer '+obj.token)
    fetch("https://localhost:7102/Account/GetAdvertisements/"+obj.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      }
     
    }).then(async(res) => {
      console.log(res)
      let data = await  res.json()
      console.log(data)
      if(data.length>0)
       this.setState((x)=>{return{...x,adArray:data }})
    })
  }

  render() {
    return <>
    <h3 className="mb-4">Мої оголошення</h3>
    {this.state.adArray.map( x => 
      <CardCar Delete={this.Delete} Edit={this.Edit} Deactivate={this.Deactivate} key={x.id} car={x}></CardCar>)
    }
    </>;
  }
}
export default MyAdd;
