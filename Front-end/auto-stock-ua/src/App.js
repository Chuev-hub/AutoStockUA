import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./Components/Account";
import Home from "./Components/Home";
import NavBar from "./Components/MyNavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import './App.css'
import "./i18n";
import Create from "./Components/Create";
import Success from "./Components/Success";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.root = null;
    this.state = {
      isSigned: false,
      intervalId: 0,
    };
    this.checkSigned = this.checkSigned.bind(this);
    this.startRetoken = this.startRetoken.bind(this);
    this.stopRetoken = this.stopRetoken.bind(this);
  }
  componentDidMount(){
    this.checkSigned();
   
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  startRetoken() {
    var intervalId = setInterval(()=>{
      let obj = JSON.parse(sessionStorage.getItem("user"));
  fetch("https://localhost:7102/Account/Retoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: "bearer " + obj.token,
      },
      body:JSON.stringify(obj.user)
    })
    .then(async (res) => {
      let data = await res.json();
      if (res.status == 200) {
        if (data?.user) 
          sessionStorage.setItem("user", JSON.stringify(data));
        
      }
    });
      }, 57000);
    this.setState((X) => {
      return { ...X, intervalId: intervalId };
    });
  }
  stopRetoken() {
    clearInterval(this.state.intervalId);
  }
  checkSigned() {
    if (sessionStorage.getItem("isSigned") == "true")
      this.setState((X) => {
        return { ...X, isSigned: true };
      });
    else
      this.setState((X) => {
        return { ...X, isSigned: false };
      });
  }
 

  render() {
    return (
      <>
        <I18nextProvider i18n={i18n}>
          <Router>
            <NavBar i18n={i18n} isSigned={this.state.isSigned}></NavBar>
            <div className="App">
              <Routes>
              <Route exact path="/" element={<Home />} />
                <Route  path="/success" element={<Success />} />
                <Route
                  path="/signin"
                  element={<SignIn  startRetoken={this.startRetoken} check={this.checkSigned} />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create" element={<Create />} />
                <Route
                  path="/account/*"
                  element={<Account stopRetoken={this.stopRetoken}  check={this.checkSigned} />}
                />
                <Route render={() => <div>Page not found</div>} />
              </Routes>
            </div>
          </Router>
        </I18nextProvider>
      </>
    );
  }
}
export default App;
