import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
class SignIn extends React.Component {
  constructor(props) {
     super(props);
     
     this.state = {
      show : false,
      message:""
    };
    this.SignIn = this.SignIn.bind(this);
  }
   SignIn(){
    let obj = JSON.stringify({email:document.getElementById("formBasicEmail").value,
    password: document.getElementById("formBasicPassword").value })
    console.log(obj)
   
    fetch("https://localhost:7102/Account/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: obj,
    })
    .then(async (res) => {
      console.log(res)
      let data = await res.json();
      if(res.status==200){
        if (data?.user) {
          sessionStorage.setItem("user", JSON.stringify(data));
          sessionStorage.setItem("isSigned", "true")
          this.props.check();
          document.getElementById('redirect').click();
        }
      }
      this.setState({show: true, message:data[0]})
    })
     
  }
  componentDidMount() {
    if (window.google) {
        const google = window.google;
        google.accounts.id.initialize({
          client_id: "748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com",
          callback: async (response) => {
          
            fetch("https://localhost:7102/Account/GoogleLogin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
        
              body: JSON.stringify(response.credential ),
            })
              .then(async (res) => {
                console.log(res)
                let data = await res.json();
                if(res.status==200){
                  if (data?.user) {
                    sessionStorage.setItem("user", JSON.stringify(data));
                    sessionStorage.setItem("isSigned", "true")
                    this.props.check();
                    document.getElementById('redirect').click();
                  }
                }
                this.setState({show: true, message:data[0]})
              });
          },
        });
  
        google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
          
            type: "icon",
           theme: "filled_black"
        });
      }
  }

  render() {
    return (
        <>
      
      <div >
      <Container style={{marginTop:"100px"}}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={7} lg={5} xs={9}>

            <Card className="shadow">
              <Card.Body>
                <div className=" mt-2">
                  <h3 className=" mb-2  ">Увійдіть</h3>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Електронна адреса
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password"  placeholder="Password" />
                      </Form.Group>
                      <Alert show={this.state.show} controlId="alert" variant={'danger'}>
 {this.state.message}
                      </Alert>
                      <div className="d-grid">
                      
                      <div className=" d-flex w-100">
                        <Button variant="dark" onClick={()=>this.SignIn()} style={{width:"100%",marginRight:"5px"}}>
                          Вхід
                        </Button>
                      <div id="signUpDiv" data-text="signup_with"></div>

                      </div>
                     
                      </div>
                      
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Нема облікового запису?{" "}
                        <Link to="/signup" className="link fw-bold">
                          Зареєструватися
                        </Link>
                        <Link to="/" id="redirect" className="link fw-bold">
                        </Link>
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
export default SignIn;