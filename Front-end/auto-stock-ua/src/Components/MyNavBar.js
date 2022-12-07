import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button } from "react-bootstrap";
import i18n from "i18next";
import { withTranslation } from 'react-i18next';
class MyNavBar extends React.Component {
  constructor(props) {
     super(props);
     let lg = 'UA'
     if(sessionStorage.getItem('lg')=='en')
        lg='󠁧󠁢󠁥󠁮EN'
     this.state = {
      isSigned : props.isSigned,
      lg: lg
      }
  this.changeLn =this.changeLn.bind(this)
}
  componentWillReceiveProps(props) {
    this.setState((s)=>{return { isSigned: props.isSigned, ...s }})
  }
  changeLn()
  {
    if(this.props.i18n.language == 'ua'){
      this.props.i18n.changeLanguage('en')
      let isSigned = this.state.isSigned;
      this.setState((s)=>{return { ...s ,lg: 'EN' }})
      console.log(this.state)

      sessionStorage.setItem('lg','en')
    }
    else{
      this.props.i18n.changeLanguage('ua')
      this.setState((s)=>{return { ...s , lg: 'UA'}})
       console.log(this.state)


      sessionStorage.setItem('lg','ua')
    }

  }
  render(){
    const { t } = this.props;
    return (

      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">AUTOSTOCK</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/d" className="link">{t('newAuto')}            </Nav.Link>
            <Nav.Link as={Link} to="/d" className="link">{t('notNewAuto')} 
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse> 
        
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
           <Link style={{marginRight:"15px",textDecoration:"none"}} onClick={()=>this.changeLn()} >
           <img style={{height:"25px"}}  src={require(this.state.lg=='EN'?"../img/ukraine.png":"../img/unitedkingdom.png")} alt="" />
           </Link> 
        </Navbar.Text>

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
           <Link to="/signin">{t('signin')}</Link>}
                       
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
  }

}
export default withTranslation()(MyNavBar);