import React from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";
import "../../../CSSFiles/StylePage.css"
function NewUser(){
    //TODO: add function that sighn in the user!

    return(
    <div>
        
        <div className="NewUserPage">
        <h1 id="h_newUser">הרשמה</h1>
            <div className="AllFeilds">
            <BasicTextFields value="שם" type="text" />
            <BasicTextFields value="תעודת זהות" type="text" />
            <BasicTextFields value="כתובת" type="text" />
            <BasicTextFields value="טלפון" type="number" />
            <BasicTextFields value="כתובת מייל" type="text" />
            <BasicTextFields value="צור סיסמא" type="password" />
            <BasicTextFields value="חזור על הסיסמא" type="password" />
            <BasicButtons value="הרשם" />
            </div>
        </div>
    </div>)
}
export default NewUser;
//TODO: Check user input. In ID field- after each number check that user entered a number and not a letter. SARA.