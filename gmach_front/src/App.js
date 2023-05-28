import logo from './logo.svg';
import './App.css';
import './Components/CSSFiles/Style.css';
import Bar from './Components/JavaScriptFiles/Bar';
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
import Application from './Components/JavaScriptFiles/Application';


function App() {

  return (
    <div>
      
    
      <Application/>
      <Router>
          <Route path="" element={<LogIn />}>
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signIn" element={<NewUser />} />
          
        </Route>
      </Router>

    </div>
  );

}
export default App;


