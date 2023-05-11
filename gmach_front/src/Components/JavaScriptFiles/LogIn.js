import React, { useContext } from "react";
import BasicTextFields from "./BasicTextFields";
import BasicButtons from "./BasicButtons";


function LogIn() {
  
    
    const myStyle = {
        width: '60%',
        height: '50%',
        marginTop: '15%',
        marginBottom: '25%',
        marginLeft: '40%',
        marginRight: '20%',
    }

    return (
        <div id="LogIn" style={myStyle}>
            <h1>התחברות</h1>
            <BasicTextFields value="שם" type="text" />
            <BasicTextFields value="סיסמא" type="password" />
            <BasicButtons value="התחבר" onClick="loginClicked"/>
        </div>)
}

export default LogIn;

