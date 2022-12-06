import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
class SignUp extends React.Component {
  constructor(props) {
     super(props);
    // this.root= null
    // this.state = {
    //    root:{}
    // };
    this.SignUp = this.SignUp.bind(this);
  }
  SignUp(){
    let obj = JSON.stringify({email:document.getElementById("formBasicEmail").value,
    password: document.getElementById("formBasicPassword").value })
    console.log(obj)
   
    fetch("https://localhost:7102/Account/Registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: obj,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        if (data?.user) {
          sessionStorage.setItem("user", JSON.stringify(data?.user));
          window.location.reload();
        }
        console.log(data);
        throw new Error(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
              .then((res) => {
              
        
                return res.json();
              })
              .then((data) => {
                if (data?.user) {
                  sessionStorage.setItem("user", JSON.stringify(data?.user));
                  window.location.reload();
                }
        
                throw new Error(data?.message || data);
              })
              .catch((error) => {
                console.log(error?.message);
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
                  <h3 className=" mb-2  ">Зареєструйтеся</h3>
                  <div className="mb-3">
                    <Form>
                   
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Електронна адреса
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                       
                      </Form.Group>
                      <div className="d-grid">
                      
                      <div className=" d-flex w-100">
                        <Button variant="dark" onClick={()=>this.SignUp()} style={{width:"100%",marginRight:"5px"}}>
                          Зареєструватись
                        </Button>
                      <div id="signUpDiv" data-text="signup_with"></div>

                      </div>
                     
                      </div>
                      
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Є обліковий запис?{" "}
                        <Link to="/signin" className="link fw-bold">
                          Увійдіть
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
export default SignUp;