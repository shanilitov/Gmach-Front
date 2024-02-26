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
    let ShowMessages = null;

    let messages = {}


    async function GetAllUsersRequests() {
        try {
            if (token != undefined) {
                console.log('in admin messages')
                const response = await fetch(`https://localhost:7275/api/Message/GetAllUnHandledContacts`, {
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

    //This useEffect funtion gets all users contact requests and diplay them to admin.
    useEffect(() => {
        GetAllUsersRequests().then((data) => {
            console.log('Contact requests: ', data)
            if ( data != undefined) {
                console.log('😎😎Mapped data: ', data)
                setContactRequests(data);
                ShowMessages = data.length > 0 ? data.map((message, index) => {
                    <div key={index}>
                        {console.log(message)}
                        <h3>{JSON.stringify(message.fullName)} wrote:</h3>
                        <Messages id={JSON.stringify(message.fromUserId)} color={index} message={JSON.stringify(message.header) + JSON.stringify(message.text)} />
                    </div>
                
            }) :<Alert msg="You don't have any mesages yet" type="info" />; 
                setIsRequest(true);
                console.log("End of fetch in admin message")
            }
            else {
                console.log('😫 Error:', data);
                setAlertMsg("Error in GetAllUsersRequests. data = " + data);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        }
        ).catch((error) => {
            console.error('Error:', error);
        }
        )

    }, [])



    /*const ShowMessages = contactRequests.length > 0 ? contactRequests.map((message, index) => {
            <div key={index}>
                {console.log(message)}
                <h3>{JSON.stringify(message.fullName)} wrote:</h3>
                <Messages id={JSON.stringify(message.fromUserId)} color={index} message={JSON.stringify(message.header) + JSON.stringify(message.text)} />
            </div>
        
    }) :<Alert msg="You don't have any mesages yet" type="info" />;*/

    
        /*<div key={index}>
            {console.log(message.id + " :  " + message)}
            <h3>{message.fullName.toString()} wrote:</h3>
            <Messages id={0} message={`${message.header.toString()} -   ${message.text.toString()}`} />
        </div>  
        */
      
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
        <div key={index}>
            {console.log(m)}
            <Messages id={m.fromUserId} color={index} message={m.text.toString()} />
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