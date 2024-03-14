import "./App.css";
import LogIn from "./Components/JavaScriptFiles/MaimComponent/LogIn";
import * as React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "@mui/icons-material";
import { Switch } from "@mui/material";
import NewUser from "./Components/JavaScriptFiles/MaimComponent/NewUser";
import "./Components/JavaScriptFiles/MaimComponent/NewUser";
import "./Components/JavaScriptFiles/MaimComponent/Application";
import Application from "./Components/JavaScriptFiles/MaimComponent/Application";
import ResponsiveAppBar from "./Components/JavaScriptFiles/HelpingComponent/ResponsiveAppBar";
import logoPhoto from "../src/img/logoPhoto.png";
import Bar from "./Components/JavaScriptFiles/HelpingComponent/Bar";
import AddLoan from "./Components/JavaScriptFiles/MaimComponent/AddLoan";
import NewLoanFile from "./Components/JavaScriptFiles/MaimComponent/NewLoanFile";
import NewDeposit from "./Components/JavaScriptFiles/MaimComponent/NewDeposit";
import Blog from "./Components/JavaScriptFiles/MaimComponent/Blog";
import MiniBlog from "./Components/JavaScriptFiles/HelpingComponent/Blog";       
import AboutUs from "./Components/JavaScriptFiles/HelpingComponent/AboutUs";
import Graphes from "./Components/JavaScriptFiles/HelpingComponent/Graphes";
import Articles from "./Components/JavaScriptFiles/HelpingComponent/Articles";
import Contact from "./Components/JavaScriptFiles/HelpingComponent/Contact";
import AdminLogIn from "./Components/JavaScriptFiles/MaimComponent/AdminLogIn";


function App(props) {
  //if any user registered or not 
  const [isRegistered, setIsRegistered] = React.useState(true);
  const [User, setUser] = React.useState({})

  //check if any user sent as a props
  React.useEffect(()=>{
    if(props.user){
      console.log(props.user)
      setUser(props.user)
      setIsRegistered(true)
    }
  })
  
  
  return (
    <div>
      <div></div>
      <Router>
        <Routes>
          <Route>
            <Route
              exact path="/"
              element={<Navigate to="/App" />}
            ></Route>
            <Route path="/SignUp" element={<NewUser />}></Route>
            <Route path="/Admin" element={<AdminLogIn/>}></Route>
            <Route path="/App" element={<Blog user isRegistered/>}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/Register/:id/:name" element={<Application  />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/Graphes" element={<Graphes />}></Route>
            <Route path="/Services" element={<MiniBlog />}></Route>
            <Route path="/Articles" element={<Articles />}></Route>
            <Route path="/ContactUs" element={<Contact />}></Route>
            <Route
              path='/AddLoan/:id/:name'
              element={
                isRegistered ? (<NewLoanFile />)
                  : (<Navigate to="/LogIn" />)}>
            </Route>
            <Route
              path="/NewDeposit/:userId/:userName"
              element={
                isRegistered ? (<NewDeposit />)
                  : (<Navigate to="/LogIn" />)} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
}
export default App;

 /**
  * 
  * StackAbuse.com
  * codedamn
  * stechies.com
  */