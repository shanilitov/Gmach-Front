import './App.css';
import LogIn from './Components/JavaScriptFiles/MaimComponent/LogIn';
import React from 'react';
import NewUser from './Components/JavaScriptFiles/MaimComponent/NewUser';
import { Route } from '@mui/icons-material';
import { Router } from '@mui/icons-material';
import { Switch } from '@mui/material';
import { Redirect } from 'react-router-dom';


function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);


  return (
    <div>
     
    
      <Router> 
        <Switch>
          <Route exact path="/registration">
            {isRegistered ? <Redirect to="/" /> : <LogIn setIsRegistered={setIsRegistered} />} 
          </Route>
          <Route path="/">
          {isRegistered ? <App /> : <Redirect to="/registration" />}
          </Route>
          <Route path="/signIn" component={NewUser} />
        </Switch>
      </Router>
    </div>
  );

}
export default App;


