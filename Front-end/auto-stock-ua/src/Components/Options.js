import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { withTranslation } from "react-i18next";
import SelectOption from "./SelectOption";

import $ from "jquery";
import jQuery from "jquery";
class Options extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.state = {
      imgArray: [],
      options: {},
      search:'/search',
      models: [],
            conditionType:{name:"All",id:-1 },
            accidentStatus:{name:"All",id:-1 },
            bodyType:{name:"All",id:-1 },
            engineType: {name:"All",id:-1 },
          model:{name:"All",id:-1 },
           color:{name:"All",id:-1 },
            country: {name:"All",id:-1 },
            driveType: {name:"All",id:-1 },
            engineType:{name:"All",id:-1 },
            gearboxType:{name:"All",id:-1 },
            numberOfDoors: {name:"All",id:-1 },
            numberOfPlaces: {name:"All",id:-1 },
           region:{name:"All",id:-1 },
           brand:{name:"All",id:-1 },
           sort:{name:"Новіші",id:0}
    };
    this.refreshModel = this.refreshModel.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.Search = this.Search.bind(this);
  }

  componentDidMount() {
    
    fetch("https://localhost:7102/Advertisement/GetOptions")
      .then((res) => res.json())
      .then((data) => {
        
            this.setState((x) => {
              return {
                ...x,
                models: [],
                options: data,
              };
            
          });
      });
  }
  async Search()
  {
    let str ="/search?"
    let opt=this.state
    if (opt.conditionType.name!="All")str+="CndtnTp="+opt.conditionType.id+"&"
  if (opt.accidentStatus.name!="All")str+="AcdtSt="+opt.accidentStatus.id+"&"
  if (opt.bodyType.name!="All")str+="BdTp="+opt.bodyType.id+"&"
  if (opt.engineType.name!="All")str+="EngTp="+opt.engineType.id+"&"
  if (opt.model.name!="All")str+="Mdl="+this.state.model.id+"&"
  if (opt.color.name!="All")str+="Clr="+opt.color.id+"&"
  if (opt.country.name!="All")str+="Cntr="+opt.country.id+"&"
  if (opt.driveType.name!="All")str+="DrvTp="+opt.driveType.id+"&"
  if (opt.engineType.name!="All")str+="EngTp="+opt.engineType.id+"&"
  if (opt.gearboxType.name!="All")str+="GrbxTp="+opt.gearboxType.id+"&"
  if (opt.numberOfDoors.name!="All")str+="Nod="+opt.numberOfDoors.id+"&"
  if (opt.numberOfPlaces.name!="All")str+="Nop="+opt.numberOfPlaces.id+"&"
  if (opt.region.name!="All")str+="Rgn="+opt.region.id+"&"
  if (opt.brand.name!="All")str+="Brnd="+opt.brand.id+"&"
  if (document.getElementById("Mileage").value!="")str+="MlgFr="+document.getElementById("Mileage").value+"&MlgTo="+document.getElementById("Mileage2").value+"&"
  if (document.getElementById("OwnerCount").value!="")str+="OwnCtFr="+document.getElementById("OwnerCount").value+"&OwnCtTo="+document.getElementById("OwnerCount2").value+"&"
  if (document.getElementById("Price").value!="")str+="PrcFr="+document.getElementById("Price").value+"&PrcTo="+document.getElementById("Price2").value+"&"
  if (document.getElementById("Power").value!="")str+="PwrFr="+document.getElementById("Power").value+"&PwrTo="+document.getElementById("Power2").value+"&"
  if (document.getElementById("EngineLiters").value!="")str+="EngLFr="+document.getElementById("EngineLiters").value+"&EngLTo="+document.getElementById("EngineLiters2").value+"&"
  if (document.getElementById("Year").value!="")str+="YrFr="+document.getElementById("Year").value+"&YrTo="+document.getElementById("Year2").value+"&"
  if (document.getElementById("IsNew").checked)str+="New=true&"
  str+="sort="+opt.sort.name+""
  await this.setState((x) => {
    return { ...x,  search:str };
  });
  document.getElementById("successredirect").click()
  }
  refreshModel(name, id) {
    console.log(name)
    this.setState((x) => {
      return { ...x,  brand:{name:name,id:id } };
    });

    fetch("https://localhost:7102/Advertisement/GetModels/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState((x) => {
          return { ...x, models: data };
        });
      });
  }
  changeOption(name, val) {
    if (name == "sort")
    this.setState((x) => {
      return {
        ...x,
          sort: [{name:"Новіші",id:0},{name:"Старіші",id:0},{name:"За зростанням ціни",id:0},{name:"За спаданням ціни",id:0}]
          .find((x) => x.name === val),
        
      };
    });
    if (name == "conditionType")
      this.setState((x) => {
        return {
          ...x,
            conditionType: x.options.conditionType.find((x) => x.name === val),
          
        };
      });
    if (name == "accidentStatus")
      this.setState((x) => {
        return {
          ...x,
          
         
            accidentStatus: x.options.accidentStatus.find(
              (x) => x.name === val
            ),
          
        };
      });
    if (name == "bodyType")
      this.setState((x) => {
        return {
          ...x,
            bodyType: x.options.bodyType.find((x) => x.name === val),
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
         
            engineType: x.options.engineType.find((x) => x.name === val),
          
        };
      });
    if (name == "model")
      this.setState((x) => {
        return {
          ...x,
          model: x.models.find((x) => x.name === val) ,
        };
      });
    if (name == "color")
      this.setState((x) => {
        return {
          ...x,
           color: x.options.color.find((x) => x.name === val) ,
        };
      });
    if (name == "country")
      this.setState((x) => {
        return {
          ...x,      
            country: x.options.country.find((x) => x.name === val),
          
        };
      });
    if (name == "driveType")
      this.setState((x) => {
        return {
          ...x,
            driveType: x.options.driveType.find((x) => x.name === val),
          
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
          
            engineType: x.options.engineType.find((x) => x.name === val),
          
        };
      });
    if (name == "gearboxType")
      this.setState((x) => {
        return {
          ...x,
    
            gearboxType: x.options.gearboxType.find((x) => x.name === val),
          
        };
      });
    if (name == "numberOfDoors")
      this.setState((x) => {
        return {
          ...x,
          
            numberOfDoors: x.options.numberOfDoors.find((x) => x.name === val),
          
        };
      });
    if (name == "numberOfPlaces")
      this.setState((x) => {
        return {
          ...x,
            numberOfPlaces: x.options.numberOfPlaces.find(
              (x) => x.name === val
            ),
          
        };
      });
    if (name == "region")
      this.setState((x) => {
        return {
          ...x,
           region: x.options.region.find((x) => x.name === val) ,
        };
      });
  }
  render() {
    const { t } = this.props;
    return (
  
  <>
        <Link to={this.state.search} id="successredirect"></Link>
        <form onSubmit={this.Create}>
          <div className="d-flex  justify-content-center">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginTop: "60px" }}
            >
              <h1 style={{ alignSelf: "center", marginBottom: "30px"  }}>Розширений пошук</h1>
             
               
              <div className="d-flex  justify-content-center">
                <div style={{ width: "450px" }}>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="conditionType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.conditionType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="accidentStatus"
                      arr={[{name:"All",id:-1}].concat(this.state.options.accidentStatus)}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="bodyType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.bodyType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="engineType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.engineType)}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.refreshModel}
                      name="brand"
                      arr={[{name:"All",id:-1}].concat(this.state.options.brand)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="model"
                      arr={[{name:"All",id:-1}].concat(this.state.models)}
                    ></SelectOption>
                  </div>

                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="color"
                      arr={[{name:"All",id:-1}].concat(this.state.options.color)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="country"
                      arr={[{name:"All",id:-1}].concat(this.state.options.country)}
                    ></SelectOption>
                  </div>
                  <div className="d-flex align-items-center justify-content-around">
                    <SelectOption
                      func={this.changeOption}
                      name="driveType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.driveType)}
                    ></SelectOption>
                    <div
                      style={{
                        minWidth: "240px",
                        margin: "auto",
                        display: "flex",
                      }}
                    >
                      <span
                        style={{ marginLeft: "40px" }}
                        className="form-check form-check-inline mt-4"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="IsNew"
                        />
                        <label className="form-check-label" htmlFor="IsNew">
                          {t("IsNew")}
                        </label>
                      </span>
                     
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="gearboxType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.gearboxType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="numberOfDoors"
                      arr={[{name:"All",id:-1}].concat(this.state.options.numberOfDoors)}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="numberOfPlaces"
                      arr={[{name:"All",id:-1}].concat(this.state.options.numberOfPlaces)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="region"
                      arr={[{name:"All",id:-1}].concat(this.state.options.region)}
                    ></SelectOption>
                  </div>
                 
                  <div className="d-flex justify-content-center">
                    <div>
                      <div style={{ marginLeft: "10px" }}>
                        {t("OwnerCount")}
                      </div>
                      <div className="d-flex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          className="form-control"
                          id="OwnerCount"
                          pattern="[0-9]+"
                          min="1"
                          onChange={(e)=>{
                               if(document.getElementById("OwnerCount2").value=="")
                               document.getElementById("OwnerCount2").value=e.target.value
                                if(Number(e.target.value)>Number(document.getElementById("OwnerCount2").value))
                                e.target.value=document.getElementById("OwnerCount2").value
                            }}
                          max={10}
                        />
                         <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          className="form-control"
                          id="OwnerCount2"
                          pattern="[0-9]+"
                          min="1"
                          onChange={(e)=>{
                            let obj = document.getElementById("OwnerCount")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={10}
                        />
                      </div>
                    </div>

                    <div>
                      <div style={{ marginLeft: "10px" }}>{t("Price")}</div>
                      <div
                        className="input-group mb-3 d-flex"
                        style={{ width: "220px", margin: "10px" }}
                      >
                        <input
                          type="number"
                          id="Price"
                          pattern="[0-9]+"
                          min="500"
                          max={250000}
                          className="form-control"
                          onChange={(e)=>{
                            let obj = document.getElementById("Price2")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)>Number(obj.value))
                             e.target.value=obj.value
                         }}
                        />
                        <input
                          type="number"
                          id="Price2"
                          pattern="[0-9]+"
                          min="500"
                          max={250000}
                          onChange={(e)=>{
                            let obj = document.getElementById("Price")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                          className="form-control"
                        />
                        <div className="input-group-prepend">
                          <span className="input-group-text"> $</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Power")}</div>
                      <div className="d-flex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          pattern="[0-9]+"
                          min="50"
                          max={500}
                          className="form-control"
                          id="Power"
                          onChange={(e)=>{
                            let obj = document.getElementById("Power2")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)>Number(obj.value))
                             e.target.value=obj.value
                         }}
                        />
                          <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          pattern="[0-9]+"
                          min="50"
                          max={500}
                          className="form-control"
                          id="Power2"
                          onChange={(e)=>{
                            let obj = document.getElementById("Power")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                        />
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>
                        {t("EngineLiters")}
                      </div>
                      <div className="d-flex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="EngineLiters"
                          className="form-control"
                          step="0.1"
                          pattern="[0-9]+"
                          min="0.5"
                          onChange={(e)=>{
                            let obj = document.getElementById("EngineLiters2")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)>Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={5}
                        />
                         <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="EngineLiters2"
                          className="form-control"
                          step="0.1"
                          pattern="[0-9]+"
                          min="0.5"
                          onChange={(e)=>{
                            let obj = document.getElementById("EngineLiters")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={5}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Year")}</div>
                      <div className="d-flex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Year"
                          className="form-control"
                          pattern="[0-9]+"
                          min="1960"
                          onChange={(e)=>{
                            let obj = document.getElementById("Year2")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)>Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={new Date().getFullYear().toString()}
                        ></input>
                          <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Year2"
                          className="form-control"
                          pattern="[0-9]+"
                          onChange={(e)=>{
                            let obj = document.getElementById("Year")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                          min="1960"
                          max={new Date().getFullYear().toString()}
                        ></input>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Mileage")}</div>
                      <div className="d-flex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Mileage"
                          className="form-control"
                          step="100"
                          pattern="[0-9]+"
                          min="0"
                          onChange={(e)=>{
                            let obj = document.getElementById("Mileage2")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)>Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={2000000}
                        />
                           <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Mileage2"
                          className="form-control"
                          step="100"
                          pattern="[0-9]+"
                          min="0"
                          onChange={(e)=>{
                            let obj = document.getElementById("Mileage")
                            if(obj.value=="")
                            obj.value=e.target.value
                             if(Number(e.target.value)<Number(obj.value))
                             e.target.value=obj.value
                         }}
                          max={2000000}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <SelectOption
                      func={this.changeOption}
                      name="sort"
                      arr={[{name:"Новіші",id:-5},{name:"Старіші",id:-1},{name:"За зростанням ціни",id:-2},{name:"За спаданням ціни",id:-3}]}
                    ></SelectOption>
                  <Button
                    variant="outline-dark"
                    className="mb-5 w-100"
                    type="submit"
                    onClick={this.Search}
                  >
                    Пошук
                  </Button>
                </div>
              </div>
            </div>
            <script></script>
          </div>
        </form>
      </>
    );
  }
}
export default withTranslation()(Options);
