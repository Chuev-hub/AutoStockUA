import React from "react";
import { Link } from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    // super(props);
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
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10%" }}
        >
          <div className="d-flex flex-column">
            <div style={{ color:"cyan", fontSize: "40px" }}>Get started!</div>
            <Link  style={{
           
           "font-size":  "30px",
            color: "white",
            "text-decoration": "none",

          }} to={"/dir/" + this.state.root.name}>
              <div>
                <img src={Image} style={{marginLeft:"35px"}} />
              </div>
              <div>{this.state.root.name}</div>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default Home;