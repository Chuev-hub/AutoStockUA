import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
class MyNavBar extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
      isSigned : props.isSigned,
  }
  console.log(this.state .isSigned)
}
  //  sessionStorage.setItem('isSigned','true');
  componentWillReceiveProps(props) {
    this.setState({ isSigned: props.isSigned })
  }
  render(){

    return (

      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">AUTOSTOCK</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/d" className="link">Нові авто
            </Nav.Link>
            <Nav.Link as={Link} to="/d" className="link">Вживані авто
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse> 
        
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          { this.props.isSigned == true ? 
          <div className="d-flex">
           <Link to="/login" >
           <FontAwesomeIcon className="myicon" icon={icon({name: 'bell', style: 'regular'})} />
           </Link> 
           <Link to="/login" style={{marginLeft:"15px"}}>
           <FontAwesomeIcon className="myicon" icon={icon({name: 'heart', style: 'regular'})} />
           </Link> 
           <Link to="/account" style={{marginLeft:"15px"}}>
           <FontAwesomeIcon className="myicon" icon={icon({name: 'user',style: 'regular' })} />
           </Link> 
           </div>
            :
           <Link to="/signin">Sign in</Link>}
                       
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
  }

}
export default MyNavBar;