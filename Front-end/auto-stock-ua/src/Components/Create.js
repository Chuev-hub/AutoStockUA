import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { withTranslation } from "react-i18next";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {},
      ad:{}
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("isSigned") != "true")
         document.getElementById("redirect").click();
    fetch("https://localhost:7102/Advertisement/GetOptions")
            .then(async(res)=>{
                let data = await res.json();
                await this.setState((x)=>{return {...x,options:data}})
                console.log(this.state)
            })
            
  }
 
  render() {
    const { t } = this.props;
    return (
      <>
        <Link to="/signin" id="redirect"></Link>

      </>
    );
  }
}
export default withTranslation()(Create);
