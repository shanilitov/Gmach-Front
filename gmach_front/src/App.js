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



