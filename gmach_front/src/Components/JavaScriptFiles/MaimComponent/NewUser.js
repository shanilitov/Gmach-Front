import React from "react";
import BasicTextFields from "../BasicTextFields";
import BasicButtons from "../BasicButtons";

function NewUser(){
    //TODO: add function that sighn in the user!

    return(
    <div>
        <h1>הרשמה</h1>
        <div>
            <BasicTextFields value="שם" type="text" />
            <BasicTextFields value="תעודת זהות" type="text" />
            <BasicTextFields value="כתובת" type="text" />
            <BasicTextFields value="טלפון" type="number" />
            <BasicTextFields value="כתובת מייל" type="text" />
            <BasicTextFields value="צור סיסמא" type="password" />
            <BasicTextFields value="חזור על הסיסמא" type="password" />
        </div>
        <BasicButtons value="הרשם" />
        
    </div>)
}
export default NewUser;