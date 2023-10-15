import React from "react";
import BasicTextFields from "../HelpingComponent/BasicTextFields";
import BasicButtons from "../HelpingComponent/BasicButtons";
import Asynchronous from "../HelpingComponent/AsynchronousFeild";
import FloatingActionButtonZoom from "../HelpingComponent/FloatingActionButtonZoom";

function AddLoan(props){
    let date = new Date()
    let name = props.name;
    const optionsToSelect = [
        {title:'הלואה לחודש', date: date.setMonth(date.getMonth() + 1)},
        {title:'הלואה לחודשיים', date: date.setMonth(date.getMonth() + 2)},
        {title:'הלואה לחצי שנה', date: date.setMonth(date.getMonth() + 6)}
    ]
    return(
        <div>
           <FloatingActionButtonZoom />
            <h1>פתיחת בקשת הלוואה חדשה</h1>
            <h2>{name}:שם</h2>
            <BasicTextFields value="סכום ההלוואה" type="number" />
            <Asynchronous optionsToSelect={optionsToSelect} nameOfSelector="בחר מסלול הלואה" />
        </div>
    )
}
export default AddLoan;
