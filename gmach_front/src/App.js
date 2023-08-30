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


function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);

  return (
    <div>
      <div></div>
        <Router>
          <Routes>
            <Route>
              <Route
                exact
                path="/"
                element={
                  isRegistered ? (
                    ((<Navigate to="/App" />),
                    (<LogIn setIsRegistered={setIsRegistered} />))
                  ) : (
                    <Navigate to="/LogIn" />
                  )
                }
              ></Route>
              <Route path="/SignUp" element={<NewUser />}></Route>
              <Route path="/App" element={<Application/>}></Route>
              <Route path="/LogIn" element={<LogIn />}></Route>
            </Route>
          </Routes>
        </Router>
    
    </div>
  );
}
export default App;

/**
 * Sara.
 * New (21/08/23):
 *   <Route exact path="/registration">
        {isRegistered ? (
          <Navigate to="/" />
        ) : (
          <LogIn setIsRegistered = {setIsRegistered} />
        )}
      </Route>
      <Route path="/">
        {isRegistered ? <App /> : <Navigate to="/registration" />}
      </Route>
      <Route path="/" component={LogIn} />
      <Route path="/NewUser" component={NewUser} />
      
 * /

/**
 * Old.
 * Shani.
 *  <Route exact path="/registration">
            {isRegistered ? <Redirect to="/" /> : <LogIn setIsRegistered={setIsRegistered} />} 
          </Route>
          <Route path="/">
          {isRegistered ? <App /> : <Redirect to="/registration" />}
          </Route>
          <Route path="/signIn" component={NewUser} />
 */
