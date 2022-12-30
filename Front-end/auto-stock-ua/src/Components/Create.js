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
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.state = {
      imgArray: [],
      options: {},
      models: [],
      ad: {},
      show: false,
      message: "",
    };
    this.refreshModel = this.refreshModel.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.ImgUpload = this.ImgUpload.bind(this);
    this.imgDelete = this.imgDelete.bind(this);
    this.Create = this.Create.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("isSigned") != "true")
      document.getElementById("redirect").click();
    fetch("https://localhost:7102/Advertisement/GetOptions")
      .then((res) => res.json())
      .then((data) => {
        fetch(
          "https://localhost:7102/Advertisement/GetModels/" + data.brand[0].id
        )
          .then((res1) => res1.json())
          .then((data2) => {
            this.setState((x) => {
              return {
                ...x,
                ad: {
                  owner: JSON.parse(sessionStorage.getItem("user")).user,
                  isActual: true,
                  priceСurrencyCode: "USD",
                  accidentStatus: data.accidentStatus[0],
                  bodyType: data.bodyType[0],
                  brand: data.brand[0],
                  color: data.color[0],
                  conditionType: data.conditionType[0],
                  country: data.country[0],
                  driveType: data.driveType[0],
                  engineType: data.engineType[0],
                  gearboxType: data.gearboxType[0],
                  model: data2[0],
                  numberOfDoors: data.numberOfDoors[0],
                  numberOfPlaces: data.numberOfPlaces[0],
                  region: data.region[0],
                },
                models: data2,
                options: data,
              };
            });
          });
      });
  }
  Create(e) {
    e.preventDefault();
    if (this.state.imgArray.length == 0) {
      this.setState((x)=>{return{...x,show:true,message:"You should add photo!" }})
      return false;
    }

    let object = this.state.ad;
    object.images = this.state.imgArray.map(function (item) {
      return { imageData: item.url };
    });
    object.carStateNumber = document.getElementById("CarStateNumber").value;
    object.price = Number(document.getElementById("Price").value);
    object.engineLiters = Number(document.getElementById("EngineLiters").value);
    object.power = document.getElementById("Power").value;
    object.vIN = document.getElementById("VIN").value;
    object.mileage = document.getElementById("Mileage").value;
    object.ownerCount = Number(document.getElementById("OwnerCount").value);
    object.year = Number(document.getElementById("Year").value);
    object.allowToComent = document.getElementById("AllowToComent").checked;
    object.isNew = document.getElementById("IsNew").checked;
    object.about = document.getElementById("About").value;
    object.date = new Date().toJSON();
    object.owner.password = "hash";
    let obj = JSON.parse(sessionStorage.getItem("user"));
    fetch("https://localhost:7102/Advertisement/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      },
      body: JSON.stringify(object),
    }).then(async(res) => {
      if(res.ok){
        document.getElementById("successredirect").click();
      }
      let data = await  res.json()
console .log(object)
      if(data.length>0)
       this.setState((x)=>{return{...x,show:true,message:data[0] }})
    })
  }
  imgDelete(id) {
    var arr = this.state.imgArray.filter((x) => x.dataNumber != id);

    this.setState((s) => {
      return { ...s, imgArray: arr };
    });
  }
  ImgUpload(e) {
    var maxLength = 4;
    var f = Array.prototype.slice.call(e.target.files)[0];

    if (!f.type.match("image.*")) return;
    if (this.state.imgArray.length > maxLength) return false;
    else {
      var len = 0;
      for (var i = 0; i < this.state.imgArray.length; i++) {
        if (this.state.imgArray[i] !== undefined) len++;
      }
      if (len > maxLength) return false;
      else {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(f);
        fileReader.onload = () => {
          var arr = this.state.imgArray;
          arr.push({
            url: fileReader.result,
            dataFile: f.name,
            dataNumber: this.counter++,
          });
          this.setState((s) => {
            return { ...s, imgArray: arr };
          });
        };
      }
    }
  }

  // IList<Image> Images
  // public string ImageData

  refreshModel(name, id) {
    console.log(name)
    this.setState((x) => {
      return { ...x, ad: { ...x.ad, brand:{name:name,id:id }} };
    });

    fetch("https://localhost:7102/Advertisement/GetModels/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState((x) => {
          return { ...x, models: data };
        });
        this.changeOption("model", data[0].name);
      });
  }
  changeOption(name, val) {
    if (name == "conditionType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            conditionType: x.options.conditionType.find((x) => x.name === val),
          },
        };
      });
    if (name == "accidentStatus")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            accidentStatus: x.options.accidentStatus.find(
              (x) => x.name === val
            ),
          },
        };
      });
    if (name == "bodyType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            bodyType: x.options.bodyType.find((x) => x.name === val),
          },
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            engineType: x.options.engineType.find((x) => x.name === val),
          },
        };
      });
    if (name == "model")
      this.setState((x) => {
        return {
          ...x,
          ad: { ...x.ad, model: x.models.find((x) => x.name === val) },
        };
      });
    if (name == "color")
      this.setState((x) => {
        return {
          ...x,
          ad: { ...x.ad, color: x.options.color.find((x) => x.name === val) },
        };
      });
    if (name == "country")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            country: x.options.country.find((x) => x.name === val),
          },
        };
      });
    if (name == "driveType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            driveType: x.options.driveType.find((x) => x.name === val),
          },
        };
      });
    if (name == "engineType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            engineType: x.options.engineType.find((x) => x.name === val),
          },
        };
      });
    if (name == "gearboxType")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            gearboxType: x.options.gearboxType.find((x) => x.name === val),
          },
        };
      });
    if (name == "numberOfDoors")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            numberOfDoors: x.options.numberOfDoors.find((x) => x.name === val),
          },
        };
      });
    if (name == "numberOfPlaces")
      this.setState((x) => {
        return {
          ...x,
          ad: {
            ...x.ad,
            numberOfPlaces: x.options.numberOfPlaces.find(
              (x) => x.name === val
            ),
          },
        };
      });
    if (name == "region")
      this.setState((x) => {
        return {
          ...x,
          ad: { ...x.ad, region: x.options.region.find((x) => x.name === val) },
        };
      });
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Link to="/signin" id="redirect"></Link>
        <Link to="/success" id="successredirect"></Link>
        <form onSubmit={this.Create}>
          <div className="d-flex  justify-content-center">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <h1 style={{ alignSelf: "center" }}>{t("createad")}</h1>
              <div className="upload__box">
                <div className="upload__img-wrap">
                  {this.state.imgArray?.map((x) => {
                    return (
                      <div className="upload__img-box">
                        <div
                          style={{
                            backgroundImage: "url(" + x.url + ")",
                            dataNumber: x.dataNumber,
                            dataFile: x.dataFile,
                          }}
                          className="img-bg"
                        >
                          <div
                            onClick={() => this.imgDelete(x.dataNumber)}
                            className=" upload__img-close"
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {this.state.imgArray == undefined ||
                    (this.state?.imgArray.length < 5 && (
                      <div className="upload__btn-box">
                        <label className="upload__btn">
                          <p
                            style={{
                              paddingTop: "58px",
                              paddingLeft: "48px",
                              fontSize: "100px",
                            }}
                          >
                            +
                          </p>
                          <input
                            type="file"
                            onChange={this.ImgUpload}
                            multiple=""
                            data-max_length=""
                            className="upload__inputfile"
                          />
                        </label>
                      </div>
                    ))}
                </div>
              </div>
              <div className="d-flex  justify-content-center">
                <div style={{ width: "450px" }}>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="conditionType"
                      arr={this.state.options.conditionType}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="accidentStatus"
                      arr={this.state.options.accidentStatus}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="bodyType"
                      arr={this.state.options.bodyType}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="engineType"
                      arr={this.state.options.engineType}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.refreshModel}
                      name="brand"
                      arr={this.state.options.brand}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="model"
                      arr={this.state.models}
                    ></SelectOption>
                  </div>

                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="color"
                      arr={this.state.options.color}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="country"
                      arr={this.state.options.country}
                    ></SelectOption>
                  </div>
                  <div className="d-flex align-items-center justify-content-around">
                    <SelectOption
                      func={this.changeOption}
                      name="driveType"
                      arr={this.state.options.driveType}
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
                      <span className="form-check form-check-inline mt-4">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="AllowToComent"
                          defaultChecked="checked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="AllowToComent"
                        >
                          {t("AllowToComent")}
                        </label>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="gearboxType"
                      arr={this.state.options.gearboxType}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="numberOfDoors"
                      arr={this.state.options.numberOfDoors}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="numberOfPlaces"
                      arr={this.state.options.numberOfPlaces}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="region"
                      arr={this.state.options.region}
                    ></SelectOption>
                  </div>
                  <div className="d-flex justify-content-center">
                    <input
                      style={{ margin: "10px", width: "220px" }}
                      type="text"
                      className="form-control"
                      placeholder={t("CarStateNumber")}
                      id="CarStateNumber"
                    ></input>
                    <input
                      style={{ margin: "10px", width: "220px" }}
                      type="text"
                      className="form-control"
                      placeholder={t("VIN")}
                      id="VIN"
                    ></input>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div>
                      <div style={{ marginLeft: "10px" }}>
                        {t("OwnerCount")}
                      </div>
                      <div>
                        <input
                          style={{ width: "220px", margin: "10px" }}
                          type="number"
                          className="form-control"
                          id="OwnerCount"
                          defaultValue={1}
                          pattern="[0-9]+"
                          min="1"
                          max={10}
                          required="required"
                        />
                      </div>
                    </div>

                    <div>
                      <div style={{ marginLeft: "10px" }}>{t("Price")}</div>
                      <div
                        className="input-group mb-3"
                        style={{ width: "220px", margin: "10px" }}
                      >
                        <input
                          type="number"
                          id="Price"
                          defaultValue={500}
                          pattern="[0-9]+"
                          min="500"
                          max={250000}
                          required="required"
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
                      <div>
                        <input
                          style={{ width: "220px", margin: "10px" }}
                          type="number"
                          defaultValue={50}
                          pattern="[0-9]+"
                          min="50"
                          max={500}
                          required="required"
                          className="form-control"
                          id="Power"
                        />
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>
                        {t("EngineLiters")}
                      </div>
                      <div>
                        <input
                          style={{ width: "220px", margin: "10px" }}
                          type="number"
                          id="EngineLiters"
                          className="form-control"
                          step="0.1"
                          defaultValue={0.5}
                          pattern="[0-9]+"
                          min="0.5"
                          max={5}
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Year")}</div>
                      <div>
                        <input
                          style={{ width: "220px", margin: "10px" }}
                          type="number"
                          id="Year"
                          className="form-control"
                          defaultValue={new Date().getFullYear().toString()}
                          pattern="[0-9]+"
                          min="1960"
                          max={new Date().getFullYear().toString()}
                          required="required"
                        ></input>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <div style={{ marginLeft: "10px" }}>{t("Mileage")}</div>
                      <div>
                        <input
                          style={{ width: "220px", margin: "10px" }}
                          type="number"
                          id="Mileage"
                          className="form-control"
                          step="100"
                          defaultValue={0}
                          pattern="[0-9]+"
                          min="0"
                          max={2000000}
                          required="required"
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div className="form-group mt-3 mb-3">
                    <label htmlFor="About">{t("About")}</label>
                    <textarea
                      className="form-control mt-3"
                      id="About"
                      placeholder={t("enterAbout")}
                      rows="3"
                      maxLength="300"
                      minLength="20"
                      required
                    ></textarea>
                  </div>
                  <Alert show={this.state.show} variant="danger">
                    {this.state.message}
                  </Alert>
                  <Button
                    variant="outline-dark"
                    className="mb-5 w-100"
                    type="submit"
                  >
                    {t("create")}
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
export default withTranslation()(Create);
