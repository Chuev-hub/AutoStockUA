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
import { withTranslation } from "react-i18next";
import x from "uniqid";
const 
 params = new URLSearchParams(window.location.hash.slice(8));
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: "",
      redirectCar:params.get("redirect")==null?null:'/car/'+params.get("redirect")
    };
    this.SignIn = this.SignIn.bind(this);
  }
  SignIn() {
    let obj = JSON.stringify({
      email: document.getElementById("formBasicEmail").value,
      password: document.getElementById("formBasicPassword").value,
    });
    fetch("https://localhost:7102/Account/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: obj,
    }).then(async (res) => {
      let data = await res.json();
      if (res.status == 200) {
        if (data?.user) {
          sessionStorage.setItem("user", JSON.stringify(data));
          sessionStorage.setItem("isSigned", "true");
          sessionStorage.setItem("isGoogle", "false");
          this.props.startRetoken();
          this.props.check();
          document.getElementById("redirect").click();
        }
      }
      this.setState({ show: true, message: data[0] });
    });
  }
  componentDidMount() {
    if (window.google) {
      const google = window.google;
      google.accounts.id.initialize({
        client_id:
          "748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com",
        callback: async (response) => {
          console.log(response);
          fetch("https://localhost:7102/Account/GoogleLogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(response.credential),
          }).then(async (res) => {
            let data = await res.json();
            if (res.status == 200) {
              if (data?.user) {
                sessionStorage.setItem("user", JSON.stringify(data));
                sessionStorage.setItem("isSigned", "true");
                sessionStorage.setItem("isGoogle", "true");
               
                this.props.check();
                this.props.startRetoken();
                if(params.get("redirect")==null)
                document.getElementById("redirect").click();
                    else
                      document.getElementById("redirectCar").click();


              }
            }
            this.setState({ show: true, message: data[0] });
          });
        },
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        type: "icon",
        theme: "filled_black",
      });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <div>
          <Container style={{ marginTop: "100px" }}>
            <Row className=" d-flex justify-content-center align-items-center">
              <Col md={7} lg={5} xs={9}>
                <Card className="shadow">
                  <Card.Body>
                    <div className=" mt-2">
                      <h3 className=" mb-2  ">{t("signin")}</h3>
                      <div className="mb-3">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="text-center">
                              {t("email")}
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder={t("enterEmail")}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>{t("password")} </Form.Label>
                            <Form.Control
                              type="password"
                              placeholder={t("password")}
                            />
                          </Form.Group>
                          <Alert
                            show={this.state.show}
                            controlId="alert"
                            variant={"danger"}
                          >
                            {this.state.message}
                          </Alert>
                          <div className="d-grid">
                            <div className=" d-flex w-100">
                              <Button
                                variant="dark"
                                onClick={() => this.SignIn()}
                                style={{ width: "100%", marginRight: "5px" }}
                              >
                                {t("signingin")}
                              </Button>
                              <div id="signUpDiv" data-text="signup_with"></div>
                            </div>
                          </div>
                        </Form>
                        <div className="mt-3">
                          <p className="mb-0  text-center">
                            {t("dontveAccount")}{" "}
                            <Link to="/signup" className="link fw-bold">
                              {t("signup")}
                            </Link>
                            <Link
                              to="/"
                              id="redirect"
                            ></Link>
                             <Link
                              to={this.state.redirectCar} id="redirectCar"
                            ></Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
export default withTranslation()(SignIn);
