import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Cabinet from "./Cabinet";
import Favourites from "./Favourites";
import MyAdd from "./MyAdd";
import MyComments from "./MyComments";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { withTranslation } from "react-i18next";

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("isSigned") != "true")
      document.getElementById("redirect").click();
  }
 
 
  render() {
    const { t } = this.props;
    return (
      <>

<div style={{marginTop:"200px"}} className="d-flex  justify-content-center ">
<div  className="d-flex flex-column justify-content-center ">
        <div  className="d-flex  justify-content-center align-items-center ">
        <FontAwesomeIcon className="myicon fa-6x" icon={icon({name: 'face-smile-wink',style: 'regular' })} />
        <h1 style={{marginLeft:"30px"}} >Успішно створено оголошення</h1>
        </div>
        <Link style={{margin:"auto",marginTop:"30px"}}  to="/" className="btn btn-outline-success w-50" id="redirect">Повернутися на головну</Link>
        </div>
        </div>
      </>
    );
  }
}
export default withTranslation()(Success);
