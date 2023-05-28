import logo from './logo.svg';
import './App.css';
import './Components/CSSFiles/Style.css'
import Asynchronous from './Components/JavaScriptFiles/AsynchronousFeild';
import BasicTextFields from "./Components/JavaScriptFiles/BasicTextFields";
import LogIn from './Components/JavaScriptFiles/LogIn';
import ResponsiveAppBar from './Components/JavaScriptFiles/ResponsiveAppBar';
import MenuAppBar from './Components/JavaScriptFiles/MenuAppBar';
import { useContext } from 'react';
import React from 'react';
import NewUser from './Components/JavaScriptFiles/NewUser';
import { Route } from '@mui/icons-material';
import { Router } from '@mui/icons-material';


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
          {isRegistered ? <Home /> : <Redirect to="/registration" />}
          </Route>
          <Route path="/signIn" component={NewUser} />
        </Switch>
      </Router>
    </div>
  );

}
export default App;


