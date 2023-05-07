import logo from './logo.svg';
import './App.css';
import './Components/CSSFiles/Style.css'
import Asynchronous from './Components/JavaScriptFiles/AsynchronousFeild';
import BasicTextFields from "./Components/JavaScriptFiles/BasicTextFields";
import LogIn from './Components/JavaScriptFiles/LogIn';
import NewUser from './Components/JavaScriptFiles/NewUser';
import { Route } from '@mui/icons-material';
import { Router } from '@mui/icons-material';


export default function App() {
  return (
    <div>
      <Router>
        <Route path="/">
          <Route path="/logIn" element={<LogIn/>}/>
          <Route path="/signIn" element={<NewUser/>}/>
        </Route>
      </Router>
    </div>
  );

}



