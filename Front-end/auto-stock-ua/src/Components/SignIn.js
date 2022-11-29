import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
class SignIn extends React.Component {
  constructor(props) {
     super(props);
    // this.root= null
    // this.state = {
    //    root:{}
    // };
  }
  componentDidMount() {
    if (window.google) {
        const google = window.google;
        google.accounts.id.initialize({
          client_id: "748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com",
          callback: async (response) => {
          
            fetch("https://localhost:7102/Account/Login", {
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
  
        // google.accounts.id.prompt()
      }
    
    
  
  }
 


  render() {
    return (
        <>
      
      <div >
      <Container style={{marginTop:"100px"}}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>

            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h3 className="fw-bold mb-2 text-uppercase ">Вхід</h3>
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
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                       
                      </Form.Group>
                      <div className="d-grid">
                      
                      <div className=" d-flex w-100">
                        <Button variant="dark" type="submit" style={{width:"100%",marginRight:"5px"}}>
                          Вхід
                        </Button>
                      <div id="signUpDiv" data-text="signup_with"></div>

                      </div>
                     
                      </div>
                      
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Нема облікового запису?{" "}
                        <Link  className="link fw-bold">
                          Зареєструватися
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