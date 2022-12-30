
import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { withTranslation } from "react-i18next";
class CardCar extends React.Component {
  constructor(props) {
    super(props);
    this.root= null
    this.state = {
       car:props.car
    };
   
  }
  componentDidMount() { 

  
  }
  componentWillReceiveProps(props) {
    this.setState((s)=>{return { ...s, car: props.car }})
  }
  render() {
    const { t } = this.props;
    return <>
    
      <Card  className="mb-3"  style={{ width: '520px',borderRadius:'15px',borderColor:"gray",padding:"10px" }}>
        <div className="d-flex">
      <Card.Img variant="top" style={{ width: '300px',borderRadius:'15px', border:"1px solid gray" }} src={this.state.car.images[0].imageData} />
      <Card.Body style={{ width: '200px' , paddingRight:"25px"}} >
        <Card.Title className="m-2">{ this.state.car.brand.name + " " + this.state.car.model.name}</Card.Title>
        <Card.Text className="m-2">
        {'Колір: '+ this.state.car.color.name}
        </Card.Text>
        <div className="d-flex" >
          <Link id={"redirecting"+this.state.car.id} to={"/car/"+this.state.car.id}></Link>
        <Button onClick={()=>{ document.getElementById("redirecting"+this.state.car.id).click() }} className="m-2"variant="outline-dark">
        <FontAwesomeIcon icon={icon({name: 'eye',style: 'solid' })} />
          </Button>
          <Button onClick={()=>this.props.Edit(this.state.car.id)} className="m-2" variant="outline-dark">
        <FontAwesomeIcon icon={icon({name: 'pencil',style: 'solid' })} />
          </Button>
          <Button onClick={()=>this.props.Delete(this.state.car.id)} className="m-2" variant="outline-dark">
        <FontAwesomeIcon icon={icon({name: 'trash-can',style: 'regular' })} />
          </Button>
     
      </div>
      <Button onClick={()=>this.props.Deactivate(this.state.car.id)} className="m-2 w-100" variant={this.state.car?.isActual?"outline-danger":"outline-success"}> 
       {this.state.car?.isActual?"Деактивувати":"Активувати"} 
          </Button>
        
      </Card.Body>
      </div>
    </Card>
    </>
    

  }
}
export default withTranslation()(CardCar) ;

