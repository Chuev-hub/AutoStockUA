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

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.refreshData = this.refreshData.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.refreshData();
    if (sessionStorage.getItem("isSigned") != "true")
      document.getElementById("redirect").click();
  }
  logout() {
    this.props.stopRetoken();
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("isSigned", "false");
    sessionStorage.setItem("isGoogle", "false");
    this.props.check();
    document.getElementById("redirect").click();
  }
  refreshData(){
    let obj = JSON.parse(sessionStorage.getItem("user"));
    fetch("https://localhost:7102/Account/get?email=" + obj.user.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + obj.token,
      },
    })
      .then((res) => res.json())
      .then((x) => {
        sessionStorage.setItem("user", JSON.stringify({token:JSON.parse(sessionStorage.getItem("user")).token ,user:x}));

        this.setState({ user: x });
      });
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Link to="/" id="redirect"></Link>

        <div style={{marginTop:"100px"}} className="d-flex justify-content-center ">
          <div style={{width:"230px" ,marginRight:"20px"}} className="d-flex flex-column align-items-center justify-contentf-center">
            
            <img
              style={{
                width: "130px",
                height:"130px",
                objectFit: 'cover',
                border: "1px solid black",
                borderRadius: "50%",
              }}
              src={this.state.user.avatar==null?require("../default-user-image.png"):this.state.user.avatar}
            ></img>
            <div className="mt-2">{this.state.user.userName}</div>
            <Link style={{marginTop:"36px"}} to='/create' className="  w-100 btn btn-outline-success">
              <div className="d-flex justify-content-start">
                <FontAwesomeIcon
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  className="myicon "
                  icon={icon({ name: "plus", style: "solid" })}
                />
                <div className="d-flex justify-content-center">
                  {" "}
                  {t("CreateAdvertisement")}
                </div>
              </div>
            </Link>
            <Link className="m-2 mt-3 w-100 btn btn-outline-dark" to="">
              <div className="d-flex justify-content-start">
                {" "}
                <FontAwesomeIcon
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  className="myicon "
                  icon={icon({ name: "user", style: "regular" })}
                />
                <div className="d-flex justify-content-center">
                  {" "}
                  {t("personalAccount")}
                </div>
              </div>
            </Link>
            <Link className="m-2 w-100 btn btn-outline-dark" to="favourites">
              <div className="d-flex justify-content-start">
                <FontAwesomeIcon
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  className="myicon "
                  icon={icon({ name: "heart", style: "regular" })}
                />
                <div className="d-flex justify-content-center">
                  {t("favourites")}
                </div>
              </div>
            </Link>
            <Link className="m-2 w-100 btn btn-outline-dark" to="myadd">
              <div className="d-flex justify-content-start">
                {" "}
                <FontAwesomeIcon
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  className="myicon "
                  icon={icon({ name: "clipboard", style: "regular" })}
                />
                <div className="d-flex justify-content-center">
                  {" "}
                  {t("myAdvertisements")}
                </div>
              </div>
            </Link>
            <Link className="m-2 w-100 btn btn-outline-dark" to="mycomments">
              <div className="d-flex justify-content-start">
                {" "}
                <FontAwesomeIcon
                  style={{ marginRight: "10px", marginTop: "5px" }}
                  className="myicon "
                  icon={icon({ name: "comment", style: "regular" })}
                />
                <div className="d-flex justify-content-center">
                  {" "}
                  {t("myComments")}
                </div>
              </div>
            </Link>
            <Button
              onClick={() => this.logout()}
              variant="outline-danger"
              className="m-2 mt-4 w-100"
            >
              {t("logout")}
            </Button>
          </div>
          <div style={{ width: "400px" }}>
            <Routes>
              <Route path="" element={<Cabinet refreshData={this.refreshData} user={this.state.user} t={t} />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="myadd" element={<MyAdd />} />
              <Route path="mycomments" element={<MyComments />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
}
export default withTranslation()(Account);
