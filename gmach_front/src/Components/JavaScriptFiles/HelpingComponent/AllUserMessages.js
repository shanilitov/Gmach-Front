import React, { useEffect, useState } from "react";

export default function AllUserMessages(props){
    const [Messages, setMessages] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");


    useEffect(() => {

    })

    //copied
    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7275/api/LoanDetails/GetAllNotApprovaledLoans");
            const data = await response.json();
            console.log("in fetchData. data before sent: ", data)
            return data;
        }
        catch (err) {
            console.log("Error fetching data: ", err);
            setAlertMsg("Error fetching data: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        }
    }
}