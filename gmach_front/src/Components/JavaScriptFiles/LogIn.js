import React, { useContext, useState } from "react";
import BasicTextFields from "./BasicTextFields";
import BasicButtons from "./BasicButtons";


function LogIn() {
    const [UserName, setUserName]= useState('')
    const onlyHebrewPattern = new RegExp(/^[\u0590-\u05FF ,.'-]+$/i);
    const isValid = onlyHebrewPattern.test(UserName);
    const handleUserName= (event)=>{
        setUserName(event)
        console.log(UserName)
        console.log(isValid)
       if(isValid){

           setUserName(event)
       }
    }
    function CheckUser(){
       
    }
    
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
            <BasicTextFields value="שם" type="text" text={UserName}/>
            <BasicTextFields value="סיסמא" type="password" />
            <BasicButtons value="התחבר" func={handleUserName} />
        </div>)
}

export default LogIn;

