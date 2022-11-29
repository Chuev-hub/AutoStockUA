import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import  Home  from "./Components/Home";
import NavBar from "./Components/MyNavBar";
import SignIn from "./Components/SignIn";


const App = () => {
  return (
    <>
    <Router>
    <NavBar></NavBar>
       <div className="App">
       <Routes>
         <Route exact path="/" component={Home}/>
          <Route  path="/signin" element={<SignIn/>}/>
         {/* <Route  path="/signup" component={SignUp}/>  */}
         <Route render={()=><div>Page not found</div>} />
        </Routes>
        </div>
    </Router>
    </> );
};
export default App;