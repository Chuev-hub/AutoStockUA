import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import   Landing  from "./Landing";
import   Login from "./Login";
import  Signup  from "./SignUp";
import  Home  from "./Home";

//748369533184-qf3bf5t1cgsba4090oemj1n1sr4s55p6.apps.googleusercontent.com
//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
const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={user?.email ? <Navigate to="/home" /> : <Landing />}
  />
  <Route
    path="/signup"
    element={user?.email ? <Navigate to="/home" /> : <Signup />}
  />
  <Route
    path="/login"
    element={user?.email ? <Navigate to="/home" /> : <Login />}
  />
  <Route
    path="/home"
    element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;