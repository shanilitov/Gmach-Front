import './App.css';
import LogIn from './Components/JavaScriptFiles/MaimComponent/LogIn';
import React from 'react';
import { Login, Route } from '@mui/icons-material';
import { Router } from '@mui/icons-material';
import { Switch } from '@mui/material';
import NewUser from './Components/JavaScriptFiles/MaimComponent/NewUser';
import { Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './Components/JavaScriptFiles/MaimComponent/NewUser';
import './Components/JavaScriptFiles/MaimComponent/Application';
import Application from './Components/JavaScriptFiles/MaimComponent/Application';

function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);


  return (
    <div>

          <Application/>

    </div>
  );

}
export default App;


/**
 * Shani.
 *  <Route exact path="/registration">
            {isRegistered ? <Redirect to="/" /> : <LogIn setIsRegistered={setIsRegistered} />} 
          </Route>
          <Route path="/">
          {isRegistered ? <App /> : <Redirect to="/registration" />}
          </Route>
          <Route path="/signIn" component={NewUser} />
 */