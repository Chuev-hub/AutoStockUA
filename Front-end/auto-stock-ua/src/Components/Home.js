import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import SelectOption from "./SelectOption";
class Home extends React.Component {
  constructor(props) {
     super(props);
    // this.root= null
    // this.state = {
    //    root:{}
    // };
    this.state = {
      options: {},
      models: [],
      brand:{name:"All",id:0 } ,
      accidentStatus:{name:"All",id:0 } ,
      model:{name:"All",id:0 } ,
      bodyType:{name:"All",id:0 } ,
      search:'/search'
    };
    this.changeOption = this.changeOption.bind(this)
    this.refreshModel = this.refreshModel.bind(this)
    this.Search = this.Search.bind(this)
  }
  async Search(){
    let str ="/search?"
    let opt=this.state
  if (opt.accidentStatus.name!="All")str+="AcdtSt="+opt.accidentStatus.id+"&"
  if (opt.bodyType.name!="All")str+="BdTp="+opt.bodyType.id+"&"
  if (opt.model.name!="All")str+="Mdl="+this.state.model.id+"&"
  if (opt.brand.name!="All")str+="Brnd="+opt.brand.id+"&"
  str+="sort=Новіші"
  await this.setState((x) => {
    return { ...x,  search:str };
  });
  document.getElementById("successredirect").click()
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
 
  refreshModel(name, id) {

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
  
    if (name == "model")
      this.setState((x) => {
        return {
          ...x,
          model: x.models.find((x) => x.name === val),
        };
      });
   
  }
  render() {
    const { t } = this.props;
    return (
        <>
        <Link to={this.state.search} id="successredirect"></Link>

      <div class="mt-3 main-hr"></div>
      <div >
      <Container style={{marginTop:"50px"}}>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col md={10} lg={7} xs={14}>

            <Card border="dark" style={{height:"350px"}} className=" ">
              <Card.Body>
                <div className=" mt-2">
                  <h3 className=" mb-2  ">{t('chooseFiltering')} </h3>
                  <div className="mb-3">
                    <Form>
                    <div className="d-flex justify-content-center">
                    <SelectOption
                      func={this.changeOption}
                      name="bodyType"
                      arr={[{name:"All",id:-1}].concat(this.state.options.bodyType)}
                    ></SelectOption>
                    <SelectOption
                      func={this.changeOption}
                      name="accidentStatus"
                      arr={[{name:"All",id:-1}].concat(this.state.options.accidentStatus)}
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
                    
                   <Link  style={{margin:"10px",marginTop:"30px",width:"220px", height:"40px"}} to='/options' className="btn btn-outline-dark">More options</Link>
                   <button  style={{margin:"10px",marginTop:"30px",width:"220px", height:"40px"}} onClick={this.Search} className= "btn btn-outline-dark">Search</button>
                  </div>
                 
                      
                    </Form>
                    
                  </div>
                 
                </div>
                
              </Card.Body>
            </Card>
            <div className="mt-5 d-flex justify-content-center " >
            <h3>Також за марками:</h3>

            </div>

            <div className="mt-2 d-flex justify-content-between flex-wrap" >
                  {this.state.options?.brand?.map(x=>
                  <Link style={{textDecoration:"none",fontFamily: "cursive",margin:"10px",fontSize:"22px", color:"black"}} to={"/search?Brnd="+x.id+'&sort=Новіші'} key={x.id}>{x.name} </Link>)}
                  </div>
          </Col>
        </Row>
      </Container>
    </div>
         
           
        
       
      </>
    );
  }
}
export default withTranslation()(Home);