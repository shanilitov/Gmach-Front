import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Messages from "./Messages";

export default function AllUserMessages(props) {
    const id = props.id
    const [userMessages, setUserMessages] = useState([]);
    const [contactRequests, setContactRequests] = useState([]);
    const [isRequest, setIsRequest] = useState(false);  //if there are contact requests
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem('token');


    let messages = {}


    //This useEffect funtion gets all users contact requests and diplay them to admin.
    useEffect(() => {
        if (token != undefined) {
            console.log('in admin messages')
            fetch('https://localhost:7275/api/Message/GetAllUnHandledContacts'
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'text/plain',
                        'Authorization': `Bearer ${token}`

                    }
                }).then((response) => response.json())
                .then((data) => {
                    console.log('Contact requests: ', data)
                    if (data.length > 0) {
                        console.log('😎😎Mapped data: ', data)
                        setContactRequests(data)
                        messages = data;
                        ShowMessages(messages)
                        setIsRequest(true)
                        console.log("End of fetch in admin message")
                    }
                    else {
                        console.log('😫 Error:', data);

                    }
                }
                ).catch((error) => {
                    console.error('Error:', error);
                }
                )
        }
    }, [])



    const ShowMessages = (data) => {
        console.log("In ShowMessages()")
        data.map((message) => {
            <div key={message.id}>
                {console.log(message.id + " :  " + message)}
                <h3>{message.fullName.toString()} wrote:</h3>
                <Messages id={0} message={`${message.header.toString()} -   ${message.text.toString()}`} />
            </div>
        })
    }


    //This useEffect function run fetchData() and messagesDisplay() to display all user messages.
    useEffect(() => {
        console.log("in alluserMessages")
        try {
            fetchData().then((data) => {
                console.log("Data got from server is: ", data);
                setUserMessages(data);

            });
        }
        catch (err) {
            console.log("Error fetching data: ", err);
            setAlertMsg("Error fetching data: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [])


    //Return all messages of this user
    async function fetchData() {
        try {
            const response = await fetch(`https://localhost:7275/api/Message/GetMessagesByUserId?id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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

    //Display all messages of this user
    const messagesDisplay = userMessages.map((m, index) => (
        messages +=
        <div key={index}>
            {console.log(m)}
            <Messages id={m.fromUserId} message={m.text.toString()} />
        </div>
    ));



    return (
        <div style={{ width: "250%" }}>
            <h3>Your Messages</h3>
            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}
            {messagesDisplay}
            {ShowMessages}
            {isRequest ? messages : null}
            {userMessages === undefined ?
                <h1>You dont have any mesages yet</h1> : <></>}
        </div>
    )
}