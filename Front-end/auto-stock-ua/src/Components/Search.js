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
import CardCar from "./CardCar";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
   
    const params = new URLSearchParams(window.location.hash.slice(8));
    let isnew = false;
    if (params.get("New")=='true')
    isnew=true
    this.state = {
        imgArray: [],
        options: {},
        cars:[],
        models: [],
        page: null,
                conditionType: null,
                accidentStatus: null,
                bodyType: null,
                engineType: null,
                model:null,
                color: null,
                country: null,
                driveType: null,
                engineType:null,
                gearboxType:null,
                numberOfDoors:null,
                numberOfPlaces:null,
                region: null,
                brand: null,
                MlgFr: null,
                MlgTo: null,
                OwnCtFr:  null,
                OwnCtTo: null,
                PrcFr: null,
                PrcTo: null,
                PwrFr: null,
                PwrTo:  null,
                EngLFr: null,
                EngLTo:  null,
                YrFr:null,
                YrTo: null,
                New: isnew
                  ,
                sort:null,
                
       
      }

    this.refreshModel = this.refreshModel.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.Search = this.Search.bind(this);
    this.GoPage = this.GoPage.bind(this);
  }
  async GoPage(i){
    const params = new URLSearchParams(window.location.hash.slice(8));

  let str ="/search?"
    let opt=this.state
  if (params.get("CndtnTp")!=null)str+="CndtnTp="+decodeURI(params.get("CndtnTp"))+"&"
  if (params.get("AcdtSt")!=null)str+="AcdtSt="+decodeURI(params.get("AcdtSt"))+"&"
  if (params.get("BdTp")!=null)str+="BdTp="+decodeURI(params.get("BdTp"))+"&"
  if (params.get("EngTp")!=null)str+="EngTp="+decodeURI(params.get("EngTp"))+"&"
  if (params.get("Mdl")!=null)str+="Mdl="+decodeURI(params.get("Mdl"))+"&"
  if (params.get("Clr")!=null)str+="Clr="+decodeURI(params.get("Clr"))+"&"
  if (params.get("Cntr")!=null)str+="Cntr="+decodeURI(params.get("Cntr"))+"&"
  if (params.get("DrvTp")!=null)str+="DrvTp="+decodeURI(params.get("DrvTp"))+"&"
  if (params.get("EngTp")!=null)str+="EngTp="+decodeURI(params.get("EngTp"))+"&"
  if (params.get("GrbxTp")!=null)str+="GrbxTp="+decodeURI(params.get("GrbxTp"))+"&"
  if (params.get("Nod")!=null)str+="Nod="+decodeURI(params.get("Nod"))+"&"
  if (params.get("Nop")!=null)str+="Nop="+decodeURI(params.get("Nop"))+"&"
  if (params.get("Rgn")!=null)str+="Rgn="+decodeURI(params.get("Rgn"))+"&"
  if (params.get("Brnd")!=null)str+="Brnd="+decodeURI(params.get("Brnd"))+"&"
  if (params.get("MlgFr")!=null)str+="MlgFr="+decodeURI(params.get("MlgFr"))+"&MlgTo="+decodeURI(params.get("MlgTo"))+"&"
  if (params.get("OwnCtFr")!=null)str+="OwnCtFr="+decodeURI(params.get("OwnCtFr"))+"&OwnCtTo="+decodeURI(params.get("OwnCtTo"))+"&"
  if (params.get("PrcFr")!=null)str+="PrcFr="+decodeURI(params.get("PrcFr"))+"&PrcTo="+decodeURI(params.get("PrcTo"))+"&"
  if (params.get("PwrFr")!=null)str+="PwrFr="+decodeURI(params.get("PwrFr"))+"&PwrTo="+decodeURI(params.get("PwrTo"))+"&"
  if (params.get("EngLFr")!=null)str+="EngLFr="+decodeURI(params.get("EngLFr"))+"&EngLTo="+decodeURI(params.get("EngLTo"))+"&"
  if (params.get("YrFr")!=null)str+="YrFr="+decodeURI(params.get("YrFr"))+"&YrTo="+decodeURI(params.get("YrTo"))+"&"
  if (params.get("New")!=null)str+="New="+decodeURI(params.get("New"))+"&"
  str+="sort="+decodeURI(params.get("sort"))+"&"
  str+="page="+i+""
    
  await this.setState((x) => {
    return { ...x,  search:str };
  });
  document.getElementById("successredirect").click()
  
  }
  refreshModel(name, id) {
    if(name=='All'){
      this.setState((x) => {
        return { ...x,  brand:{name:name,id:id },models: [] };
      });
          this.changeOption("model", 'All');
    }
    else{
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
          this.changeOption("model", 'All');
        });
    }
  }
  componentDidMount() {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(res=>{return res.json();}).then(d=>{
    
     this.setState((s)=>{return { ...s, rate:d.find(cc=>cc.cc=='USD').rate }})
   }
   )
    fetch("https://localhost:7102/Advertisement/GetOptions")
      .then((res) => res.json())
      .then((data) => {
        const params = new URLSearchParams(window.location.hash.slice(8));
        console.log(window.location.hash.slice(8))

        let str = ''
        if(params.get("Brnd")==null)
        str=( "https://localhost:7102/Advertisement/GetModels/"+data.brand[0].id  )
       else 
       str=( "https://localhost:7102/Advertisement/GetModels/" + params.get("Brnd"))
        fetch(
         str
        )
          .then((res1) => res1.json())
          .then((data2) => {
          

    fetch("https://localhost:7102/Advertisement/Get"+window.location.hash.slice(8))
      .then((res3) => res3.json())
      .then((data3) => {
        this.setState((x) => {
          return {
            ...x,
            cars:data3.cars,
            pages:data3.pages,
            models: data2,
            options: data,
            page: decodeURI(params.get("page")),
           sort:{name:"Новіші",id:0},
            conditionType:params.get("CndtnTp")!=null? data.conditionType.find(
              (x) => x.id == decodeURI(params.get("CndtnTp"))
            ):{name:"All",id:-1 },
            accidentStatus:params.get("AcdtSt")!=null? data.accidentStatus.find(
              (x) => x.id == decodeURI(params.get("AcdtSt"))
            ):{name:"All",id:-1 },
            bodyType:params.get("BdTp")!=null? data.bodyType.find(
              (x) => x.id == decodeURI(params.get("BdTp"))
            ):{name:"All",id:-1 },
            engineType:params.get("EngTp")!=null? data.engineType.find(
              (x) => x.id == decodeURI(params.get("EngTp"))
            ):{name:"All",id:-1 },
            model:params.get("Mdl")!=null? data2.find(
              (x) => x.id == decodeURI(params.get("Mdl"))
            ):{name:"All",id:-1 },
            color:params.get("Clr")!=null? data.color.find(
              (x) => x.id == decodeURI(params.get("Clr"))
            ):{name:"All",id:-1 },
            country:params.get("Cntr")!=null? data.country.find(
              (x) => x.id == decodeURI(params.get("Cntr"))
            ):{name:"All",id:-1 },
            driveType:params.get("DrvTp")!=null? data.driveType.find(
              (x) => x.id == decodeURI(params.get("DrvTp"))
            ):{name:"All",id:-1 },
            engineType:params.get("EngTp")!=null? data.engineType.find(
              (x) => x.id == decodeURI(params.get("EngTp"))
            ):{name:"All",id:-1 },
            gearboxType: params.get("GrbxTp")!=null?data.gearboxType.find(
              (x) => x.id == decodeURI(params.get("GrbxTp"))
            ):{name:"All",id:-1 },
            numberOfDoors:params.get("Nod")!=null? data.numberOfDoors.find(
              (x) => x.id == decodeURI(params.get("Nod"))
            ):{name:"All",id:-1 },
            numberOfPlaces:params.get("Nop")!=null? data.numberOfPlaces.find(
              (x) => x.id == decodeURI(params.get("Nop"))
            ):{name:"All",id:-1 },
            region:params.get("Rgn")!=null? data.region.find(
              (x) => x.id == decodeURI(params.get("Rgn"))
            ):{name:"All",id:-1 },
            brand: params.get("Brnd")!=null?data.brand.find(
              (x) => x.id == decodeURI(params.get("Brnd"))
            ):{name:"All",id:-1 },
            MlgFr: decodeURI(params.get("MlgFr")),
            
            MlgTo: decodeURI(params.get("MlgTo"))
            ,
            OwnCtFr:  decodeURI(params.get("OwnCtFr"))
            ,
            OwnCtTo:  decodeURI(params.get("OwnCtTo"))
            ,
            PrcFr: decodeURI(params.get("PrcFr"))
            ,
            PrcTo: decodeURI(params.get("PrcTo"))
            ,
            PwrFr:  decodeURI(params.get("PwrFr"))
            ,
            PwrTo:  decodeURI(params.get("PwrTo"))
            ,
            EngLFr:  decodeURI(params.get("EngLFr"))
            ,
            EngLTo:  decodeURI(params.get("EngLTo"))
            ,
            YrFr:decodeURI(params.get("YrFr"))
            ,
            YrTo: decodeURI(params.get("YrTo"))
            ,
            sort:params.get("sort")!=null?[{name:"Новіші",id:-5},{name:"Старіші",id:-1},{name:"За зростанням ціни",id:-2},{name:"За спаданням ціни",id:-3}].find(
              (x) => x.name === decodeURI(params.get("sort"))
            ):{name:"Новіші",id:-5},
          };
       
      });
            
            
          });
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
    if(name=='All'){
      this.setState((x) => {
        return { ...x,  brand:{name:name,id:id },models: [] };
      });
          this.changeOption("model", 'All');
    }
    else{
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
          this.changeOption("model", 'All');
        });
    }
   
  }
  changeOption(name, val) {
    console.log(name)
    console.log(val)
                    
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
            conditionType: val=='All'?{name:'All',id:-1}:x.options.conditionType.find((x) => x.name === val),
          
        };
      });
    if (name == "accidentStatus")
      this.setState((x) => {
        return {
          ...x,
         
            accidentStatus:val=='All'?{name:'All',id:-12}: x.options.accidentStatus.find(
              (x) => x.name === val
            ),
          
        };
      });
    if (name == "bodyType")
      this.setState((x) => {
        return {
          ...x,
        
            bodyType:val=='All'?{name:'All',id:-13}: x.options.bodyType.find((x) => x.name === val),
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
         
            engineType:val=='All'?{name:'All',id:-44}: x.options.engineType.find((x) => x.name === val),
          
        };
      });
    if (name == "model")
      this.setState((x) => {
        return {
          ...x,
        
          model: val=='All'?{name:'All',id:-16}:x.models.find((x) => x.name === val) ,
        };
      });
    if (name == "color")
      this.setState((x) => {
        return {
          ...x,
        
           color: val=='All'?{name:'All',id:-17}:x.options.color.find((x) => x.name === val) ,
        };
      });
    if (name == "country")
      this.setState((x) => {
        return {
          ...x,      
         
            country:val=='All'?{name:'All',id:-18}: x.options.country.find((x) => x.name === val),
          
        };
      });
    if (name == "driveType")
      this.setState((x) => {
        return {
          ...x,
         
            driveType:val=='All'?{name:'All',id:-19}: x.options.driveType.find((x) => x.name === val),
          
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
          
            engineType: val=='All'?{name:'All',id:-44}:x.options.engineType.find((x) => x.name === val),
          
        };
      });
    if (name == "gearboxType")
      this.setState((x) => {
        return {
          ...x,
      
            gearboxType:val=='All'?{name:'All',id:-143}: x.options.gearboxType.find((x) => x.name === val),
          
        };
      });
    if (name == "numberOfDoors")
      this.setState((x) => {
        return {
          ...x,
            numberOfDoors:val=='All'?{name:'All',id:-152}: x.options.numberOfDoors.find((x) => x.name === val),
          
        };
      });
    if (name == "numberOfPlaces")
      this.setState((x) => {
        return {
          ...x,
            numberOfPlaces:val=='All'?{name:'All',id:-151}: x.options.numberOfPlaces.find(
              (x) => x.name === val
            ),
          
        };
      });
    if (name == "region")
      this.setState((x) => {
        return {
          ...x,
           region:val=='All'?{name:'All',id:-165}: x.options.region.find((x) => x.name === val) ,
        };
      });
  }
  render() {
    const { t } = this.props;
    return (
      <div style={{ marginTop: "100px" }}>
        <Link to="/signin" id="redirect"></Link>
        <Link to={this.state.search} id="successredirect"></Link>
        <form onSubmit={this.Create}>
          <div className="d-flex  justify-content-center" >
            <div
              className="d-flex flex-column "
              
            >
              <h4 className="d-flex  justify-content-center">
              Налаштовуйте:</h4>
               
              <div className="d-flex  justify-content-center">
                <div style={{ width: "" }}>
                <SelectOption
                      func={this.changeOption}
                      name="sort"
                      
                      selecting={this.state.sort}
                      arr={[{name:"Новіші",id:-5},{name:"Старіші",id:-1},{name:"За зростанням ціни",id:-2},{name:"За спаданням ціни",id:-3}]}
                    ></SelectOption>
                <div >
                    
                    <SelectOption
                      func={this.changeOption}
                      name="conditionType"
                      selecting={this.state.conditionType}

                      arr={[{name:"All",id:-1}].concat(this.state.options.conditionType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="accidentStatus"
                      selecting={this.state.accidentStatus}

                      arr={[{name:"All",id:-12}].concat(this.state.options.accidentStatus)}
                    ></SelectOption>
                  </div>
                  <div >
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.bodyType}
                      name="bodyType"
                      arr={[{name:"All",id:-13}].concat(this.state.options.bodyType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.engineType}
                      name="engineType"
                      arr={[{name:"All",id:-44}].concat(this.state.options.engineType)}
                    ></SelectOption>
                  </div>
                  <div >
                    <SelectOption
                      func={this.refreshModel}
                      selecting={this.state.brand}
                      name="brand"
                      arr={[{name:"All",id:-15}].concat(this.state.options.brand)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.model}
                      name="model"
                      arr={[{name:"All",id:-16}].concat(this.state.models)}
                    ></SelectOption>
                  </div>

                  <div >
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.color}
                      name="color"
                      arr={[{name:"All",id:-17}].concat(this.state.options.color)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.country}
                      name="country"
                      arr={[{name:"All",id:-18}].concat(this.state.options.country)}
                    ></SelectOption>
                  </div>
                  <div >
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.driveType}
                      name="driveType"
                      arr={[{name:"All",id:-19}].concat(this.state.options.driveType)}
                    ></SelectOption>
                    <div
                      style={{
                        minWidth: "240px",
                        margin: "auto",
                        display: "flex",
                      }}
                    >
                      <span
                        style={{ margin: "20px" }}
                        className="form-check form-check-inline mt-4"
                      >
                       
                        <input
                        className="form-check-input"
                        type="checkbox"
                        id="IsNew"
                        defaultChecked={this.state.New}
                      />

                    
                        <label className="form-check-label" htmlFor="IsNew">
                          {t("IsNew")}
                        </label>
                      </span>
                     
                    </div>
                  </div>
                  <div >
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.gearboxType}
                      name="gearboxType"
                      arr={[{name:"All",id:-143}].concat(this.state.options.gearboxType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.numberOfDoors}
                      name="numberOfDoors"
                      arr={[{name:"All",id:-152}].concat(this.state.options.numberOfDoors)}
                    ></SelectOption>
                  </div>
                  <div >
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.numberOfPlaces}
                      name="numberOfPlaces"
                      arr={[{name:"All",id:-151}].concat(this.state.options.numberOfPlaces)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      selecting={this.state.region}
                      name="region"
                      arr={[{name:"All",id:-165}].concat(this.state.options.region)}
                    ></SelectOption>
                  </div>
                 
                  <div >
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
                          defaultValue={this.state.OwnCtFr}
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
                          defaultValue={this.state.OwnCtTo}

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

                    <div className="d-flex flex-column">
                      <div style={{ marginLeft: "10px" }}>{t("Price")}</div>
                      <div
                        className="input-group mb-3 d-flfex"
                        style={{ width: "220px", margin: "10px" }}
                      >
                        <input
                          type="number"
                          id="Price"
                          pattern="[0-9]+"
                          min="500"
                          max={250000}
                          defaultValue={this.state.PrcFr}

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
                          defaultValue={this.state.PrcTo}

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
                  <div className="d-flex flex-column">
                    <div className="inpfut-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Power")}</div>
                      <div className="d-fflex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          pattern="[0-9]+"
                          min="50"
                          max={500}
                          defaultValue={this.state.PwrFr}

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
                          defaultValue={this.state.PwrTo}

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
                    <div className="inpsut-group mb-3">
                      <div style={{ marginLeft: "10px" }}>
                        {t("EngineLiters")}
                      </div>
                      <div className="d-fflex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="EngineLiters"
                          className="form-control"
                          step="0.1"
                          defaultValue={this.state.EngLFr}

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
                          defaultValue={this.state.EngLTo}

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
                  <div >
                    <div className="indput-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Year")}</div>
                      <div className="d-flfex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Year"
                          className="form-control"
                          pattern="[0-9]+"
                          defaultValue={this.state.YrFr}

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
                          defaultValue={this.state.YrTo}
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
                    <div className="indput-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Mileage")}</div>
                      <div className="d-flfex">
                      <input
                          style={{ width: "100px", margin: "10px" }}
                          type="number"
                          id="Mileage"
                          defaultValue={this.state.MlgFr}

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
                          defaultValue={this.state.MlgTo}

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
                 
                  <Button
                    variant="outline-dark"
                    className="mb-5 "
                    style={{width:"200px"}}
                    type="submit"
                    onClick={this.Search}
                  >
                    Пошук
                  </Button>
                </div>
              </div>
            </div>
            
           

            <div style={{width:"600px"}}>
            {this.state.cars?.length==0?
            <h3 style={{marginLeft:"300px"}}> Машин немає </h3>
            : this.state.cars.map( x => 
              <CardCar 
              isMine={"no"}
              rate={this.state.rate}
              key={x.id} car={x}></CardCar>)
            
    }

    </div>
           
            
            <script></script>
          </div>
        </form>
        <div className="d-flex justify-content-center">
        {[...Array(this.state.pages).keys()].map(
              x=>   <Button variant='outline-dark' onClick={()=>this.GoPage(x)} className="  m-2" key={x}>{x}</Button>)
            }
        </div>
       
         
      </div>
    );
  }
}
export default withTranslation()(Search);
