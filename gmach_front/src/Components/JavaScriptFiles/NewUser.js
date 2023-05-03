import React from "react";
import BasicTextFields from "./BasicTextFields";
import BasicButtons from "./BasicButtons";

function NewUser(){
    return(
    <div>
        <h1>הרשמה</h1>
        <div>
            <BasicTextFields value="שם" type="text" />
            <BasicTextFields value="תעודת זהות" type="password" />
            <BasicTextFields value="כתובת" type="password" />
            <BasicTextFields value="טלפון" type="password" />
            <BasicTextFields value="כתובת מייל" type="password" />
            <BasicTextFields value="צור סיסמא" type="password" />
        </div>
        <BasicButtons value="הרשם" func="" />
        
    </div>)
}
export default NewUser;