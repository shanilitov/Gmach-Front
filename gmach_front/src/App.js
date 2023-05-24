import logo from './logo.svg';
import './App.css';
import './Components/CSSFiles/Style.css';
import Bar from './Components/JavaScriptFiles/Bar';
import Asynchronous from './Components/JavaScriptFiles/AsynchronousFeild';
import BasicTextFields from "./Components/JavaScriptFiles/BasicTextFields";
import LogIn from './Components/JavaScriptFiles/LogIn';
import NewUser from './Components/JavaScriptFiles/NewUser';
import { Route } from '@mui/icons-material';
import { Router } from '@mui/icons-material';
import Application from './Components/JavaScriptFiles/Application';


export default function App() {
  return (
    <div>
      <Application/>
      <Router>
        <Route path="/" element ={<Application/>}>
          <Route path="/logIn" element={<LogIn/>}/>
          <Route path="/signIn" element={<NewUser/>}/>
          <Route path="/app" element={<Application/>}/>
        </Route>
      </Router> */}
      <Application />
      
    </div>
  );

}



