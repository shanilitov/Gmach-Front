import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Messages from "./Messages";
import GetUserNameById from "./GetUserNameById";
import TextField from '@mui/material/TextField';
import BasicButtons from "./BasicButtons";
import { get } from "jquery";

export default function AllUserContactRequest() {
    const [contactRequests, setContactRequests] = useState([]);
    const token = localStorage.getItem('token');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [isRequest, setIsRequest] = useState(false);

    useEffect(() => {
        setData()
    }, 10000000000)

    async function setData() {
        console.log("in set data - Contact request")
        GetAllUsersRequests().then(data => {
            setContactRequests(data)

            console.log('contactRequests', contactRequests)
            if (contactRequests.length !== 0)
                setIsRequest(true)

        })
    }


    async function GetAllUsersRequests() {
        try {
            if (token != undefined) {
                console.log('in fech all contact')
                const response = await fetch(`https://localhost:7275/api/Message/GetAllContacts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log("🚇In GetAllUsersRequests. data before sent: ", data)
                return data;
            }
        }
        catch (err) {
            console.log("Error in GetAllUsersRequests: ", err);
            setAlertMsg("Error in GetAllUsersRequests: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 6000);

        }
    }

    return (
        <div style={{
            width: "200%",
            display: 'flex',
            flexDirection: 'column'
        }}>




            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}

        </div>
    )
}