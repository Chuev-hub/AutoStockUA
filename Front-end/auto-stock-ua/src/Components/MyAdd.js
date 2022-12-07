import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
class MyAdd extends React.Component {
  constructor(props) {
    super(props);
    // this.root= null
    // this.state = {
    //    root:{}
    // };
  }
  componentDidMount() {
    console.log(sessionStorage.getItem("user"));
  }

  render() {
    return <>MyAdd</>;
  }
}
export default MyAdd;
