import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import  Home  from "./Components/Home";
import NavBar from "./Components/NavBar";

//748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com
//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
const App = () => {
  return (
    <>
    <Router>
    <NavBar></NavBar>
       <div className="App">
       <Routes>
         <Route exact path="/" component={Home}/>
         {/* <Route  path="/login" component={Login}/>
         <Route  path="/signup" component={SignUp}/> */}
         <Route render={()=><div>Page not found</div>} />
        </Routes>
        </div>
    </Router>
    </> );
};
export default App;