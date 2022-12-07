import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Account from "./Components/Account";
import  Home  from "./Components/Home";
import NavBar from "./Components/MyNavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import "./i18n";


class App extends React.Component {
  constructor(props) {
     super(props);
    this.root= null
    this.state = {
       isSigned:false
    };
    this.checkSigned = this.checkSigned.bind(this)
    
  }
  checkSigned(){
    console.log("F"+sessionStorage.getItem("isSigned"))
    if(sessionStorage.getItem("isSigned")=="true")
    this.setState({  isSigned:true})
    else
    this.setState({  isSigned:false})
  }
  componentDidMount() {
   this. checkSigned()
  }
 


  render() {
    return (
        <>
         <I18nextProvider i18n={i18n}>
     <Router>
    <NavBar i18n={i18n} isSigned={this.state.isSigned}></NavBar>
       <div className="App">
       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route  path="/signin" element={<SignIn check={this.checkSigned}/>}/>
         <Route  path="/signup" element={<SignUp/>}/> 
         <Route  path="/account/*" element={<Account check={this.checkSigned}/>}/> 
         <Route render={()=><div>Page not found</div>} />
        </Routes>
        </div>
    </Router>
    </I18nextProvider>
      </>
    );
  }
}
export default App;
