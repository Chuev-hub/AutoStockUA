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
  }
 


  render() {
    return (
        <>
      
      <div >
      <Container style={{marginTop:"100px"}}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={7} lg={5} xs={9}>

            <Card border="info" className=" ">
              <Card.Body>
                <div className=" mt-2">
                  <h3 className=" mb-2  ">Оберіть фільтруючи</h3>
                  <div className="mb-3">
                    <Form>
                   
                      {/* <Form.Group className="mb-3" controlId="option1">
                        <Form.Label className="btn btn-outline-secondary">
                        Checked
                        </Form.Label>
                        <Form.Check type="radio"  name="options-outlined"  className="btn-check" autocomplete="off"  />
                      </Form.Group> */}

                      {/* <input type="radio" class="btn-check m-2" name="options-outlined" id="option2" checked/>
                      <label class="btn btn-outline-secondary m-2" for="option2" >Всі</label>

                       <input type="radio" class="btn-check m-2" name="options-outlined" id="option3" />
                        <label class="btn btn-outline-secondary m-2" for="option3">Вживані</label>

                     <input type="radio" class="btn-check m-2 m-2" name="options-outlined" id="option4" />
                     <label class="btn btn-outline-secondary m-2" for="option4">Нові</label> 

                     
                      <div className="d-grid">
                      
                      <div className=" d-flex w-100">
                        <Button variant="dark" type="submit" style={{width:"100%",marginRight:"5px"}}>
                          Розширенй пошук
                        </Button>

                      </div>
                     
                      </div> */}
                      
                    </Form>
                   
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