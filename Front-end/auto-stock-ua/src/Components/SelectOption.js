import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { withTranslation } from "react-i18next";
import uniqid from 'uniqid';

class SelectOption extends React.Component {
  constructor(props) {
    super(props);
   this.state={
    arr:props.arr,
    name:props.name,
    key: uniqid()
   }
   this.change = this.change.bind(this)
  }
  change(){
    var e = document.getElementById(this.props.name);
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    if(this.state.name =='brand')
       this.props.func( text, value)
   else
      this.props.func( this.state.name, text)

    //   refreshModel(name, id)
    //   changeOption(name, val)
  }
  componentDidMount() {
  
  }
  componentWillReceiveProps(props) {
    this.setState({arr:props.arr,
                   name:props.name})
  }
  render() {
    const { t } = this.props;
    return (
      <div>
          <div style={{marginLeft:"10px"}}>  {t (this.state.name)}</div>
          <select id={this.props.name} onChange={this.change} className="form-select" style={{margin:"10px",width:"220px"}} >
          {this.state.arr?.map(x=><option value={x?.id} key={x?.id}>{x?.name}</option>)}
           {this.state.arr==undefined&& 
           <option selected>Don't have</option>}
        </select>
      </div>
    );
  }
}
export default withTranslation()(SelectOption);
