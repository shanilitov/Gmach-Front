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

    const [responseHeader, setResposeHeader] = useState('')
    const [responseMessage, setResposeMessage] = useState('')

    useEffect(() => {
        setData()
            .then(() => {
                if (contactRequests.length > 0)
                    setIsRequest(true)
            })
    }, 1000000000)

    async function setData() {
        console.log("in set data - Contact request")
        GetAllUsersRequests().then(data => {

            console.log('contactRequests', contactRequests)
            setContactRequests(data)
            console.log('contactRequests', contactRequests)
            if (contactRequests.length > 0)
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
                setContactRequests(data)
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


    async function sendMessageClicked(email, requestId) {
        try {
            if (token != undefined) {
                if (email != undefined && responseHeader !== '' && responseMessage !== '') {
                    console.log('in send response')
                    const emailDetails = {
                        email: email,
                        subject: responseHeader,
                        message: responseMessage
                    }
                    const response = await fetch(`https://localhost:7275/api/Message/SendEmailToUser`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'accept': '*/*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(emailDetails)
                    });
                    if (await response.status == 200) {
                        setResposeHeader('')
                        setAlertMsg('')
                        try {
                            //change the contact to handaled
                            const r = await fetch(`https://localhost:7275/api/Message/ChangeToHandled?id=${requestId}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'accept': 'text/plain'
                                }
                            });
                            if (await r.status === 200) {
                                console.log('success')

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
                }
                else {
                    setAlertMsg('Please check out that you filled all the feilds.')
                    setShowAlert(true)
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 6000);
                }
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

    const border = {
        border: '2px solid #333',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px',
    };

    const handaledStyle = {
        border: '2px solid #333',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px',
        backgroundColor: "rgb(0, 32, 96)",
        color : 'white'
    }

    const contactsDisplayer = contactRequests.map((contact, index) => (
        <div key={index} style={contact.handled ? handaledStyle : border}>
            {console.log('in contact map', contact)}
            <div style={{
                backgroundColor: 'yellow',
                color: "rgb(0, 32, 96)"
            }}>{`From: ${contact.fullName}`}</div>
            <div>
                <h3>{contact.text}</h3>
                <p>{contact.text}</p>
            </div>
            {contact.handled == false ?
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <TextField
                        header="Header"
                        type="text"
                        label="Enter your response Header:"
                        onChange={(ev) => {
                            setResposeHeader(ev.target.value);
                        }}
                        onBlur={(ev) => {
                            setResposeHeader(ev.target.value); // Set the valid input to the name variable
                        }}

                        key={`header${index}`} />
                    <TextField
                        header="Message"
                        type="text"
                        label="Enter your message:"
                        onChange={(ev) => {
                            setResposeMessage(ev.target.value);
                        }}
                        onBlur={(ev) => {
                            setResposeMessage(ev.target.value); // Set the valid input to the name variable
                        }}
                        key={`message${index}`} />

                    <div onClick={() => sendMessageClicked(contact.email, contact.id)}><BasicButtons value="Send Response" /></div>
                </div> : <div style={{
                    backgroundColor: 'yellow',
                    color: "rgb(0, 32, 96)"
                }}>handaled</div>}
        </div>
    ))

    return (
        <div style={{
            width: "200%",
            display: 'flex',
            flexDirection: 'column'
        }}>


            {contactsDisplayer}
            {isRequest == false ? 'No contact requests yet.' : <></>}
            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}

        </div>
    )
}