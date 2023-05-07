import logo from './logo.svg';
import './App.css';
import './Components/CSSFiles/Style.css'
import Asynchronous from './Components/JavaScriptFiles/AsynchronousFeild';
import BasicTextFields from "./Components/JavaScriptFiles/BasicTextFields";
import LogIn from './Components/JavaScriptFiles/LogIn';
import NewUser from './Components/JavaScriptFiles/NewUser';


export default function App() {
  return (
    <div >
      <LogIn/>
      <NewUser/>
    </div>
  );
}


