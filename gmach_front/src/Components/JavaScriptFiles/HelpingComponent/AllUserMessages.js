import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Messages from "./Messages";
import GetUserNameById from "./GetUserNameById";
import TextField from '@mui/material/TextField';
import BasicButtons from "./BasicButtons";

export default function AllUserMessages(props) {
    const id = props.id
    const [userMessages, setUserMessages] = useState([]);
    const [contactRequests, setContactRequests] = useState([]);
    const [isRequest, setIsRequest] = useState(false);  //if there are contact requests
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem('token');
    const [userdic, setUserdic] = useState({})
    const [myMessage, setMyMessage] = useState('')
    //for admin state:
    const isAdmin = id == 20;
    const [selectedUser, setSelectedUser] = useState(null);
    const [AllTheUsersMessages, setAllTheUsersMessages] = useState([])
    const [update, setUpdate] = useState(1)

    let messages = {}
 

    // async function GetAllUsersRequests() {
    //     try {
    //         if (token != undefined) {
    //             console.log('in admin messages')
    //             const response = await fetch(`https://localhost:7275/api/Message/GetAllUnHandledContacts`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             const data = await response.json();
    //             console.log("🚇In GetAllUsersRequests. data before sent: ", data)
    //             return data;
    //         }
    //     }
    //     catch (err) {
    //         console.log("Error in GetAllUsersRequests: ", err);
    //         setAlertMsg("Error in GetAllUsersRequests: " + err);
    //         setShowAlert(true);
    //         setTimeout(() => {
    //             setShowAlert(false);
    //         }, 6000);

    //     }
    // }

    //This useEffect funtion gets all users contact requests and diplay them to admin.
    // useEffect(() => {
    //     GetAllUsersRequests().then((data) => {
    //         console.log('Contact requests: ', data)
    //         if (data != undefined) {
    //             console.log('😎😎Mapped data: ', data)
    //             setContactRequests(data);
    //             ShowMessages = data.length > 0 ? data.map((message, index) => {
    //                 <div key={index}>
    //                     {console.log(message)}
    //                     <h3>{JSON.stringify(message.fullName)} wrote:</h3>
    //                     <Messages id={JSON.stringify(message.fromUserId)} color={index} message={JSON.stringify(message.header) + JSON.stringify(message.text)} />
    //                 </div>

    //             }) : <Alert msg="You don't have any mesages yet" type="info" />;
    //             setIsRequest(true);
    //             console.log("End of fetch in admin message")
    //         }
    //         else {
    //             console.log('😫 Error:', data);
    //             setAlertMsg("Error in GetAllUsersRequests. data = " + data);
    //             setShowAlert(true);
    //             setTimeout(() => {
    //                 setShowAlert(false);
    //             }, 3000);
    //         }
    //     }
    //     ).catch((error) => {
    //         console.error('Error:', error);
    //     }
    //     )


    // }, [])



    // const ShowMessages = contactRequests.length > 0 ? contactRequests.map((message, index) => {
    //     <div key={index}>
    //         {console.log(message)}
    //         <h3>{JSON.stringify(message.fullName)} wrote:</h3>
    //         <Messages id={JSON.stringify(message.fromUserId)} color={index} message={JSON.stringify(message.header) + JSON.stringify(message.text)} />
    //     </div>

    // }) : <Alert msg="You don't have any mesages yet" type="info" />;


    /*<div key={index}>
        {console.log(message.id + " :  " + message)}
        <h3>{message.fullName.toString()} wrote:</h3>
        <Messages id={0} message={`${message.header.toString()} -   ${message.text.toString()}`} />
    </div>  
    */

    //This useEffect function run fetchData() and messagesDisplay() to display all user messages.
    useEffect(() => {
        setData()
        
    }, 10000000000)

    function setData() {
        if (update) {


            console.log("in alluserMessages")
            try {
                fetchData().then((data) => {
                    console.log("Data got from server is: ", data);
                    setUserMessages(data);

                    data.map(m => (
                        getUserNameFunc(m.fromUserId)
                    ))
                    setAllTheUsersMessages(data)
                    if (isAdmin) {
                        setSelectedUser(20)
                        handleUserChange(20)
                    }

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
        }
    }


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

        <div key={index} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: m.fromUserId == id ? "flex-start" : "flex-end",
            width: 'auto',
            textAlign: m.fromUserId == id ? 'left' : 'right',
        }}>

            {console.log("##")}
            {console.log(m, m.fromUserId == id)}
            {console.log('User Dic', userdic)}
            {console.log(userdic[m.fromUserId] === undefined ? 'raed the user name' + getUserNameFunc(m.fromUserId) : userdic[m.fromUserId])}
            <div style={{
                display: "inline-block",
                width: 'fit-content',
                textAlign: m.fromUserId == id ? 'left' : 'right',

            }}>
                <label key={index}>{'Message From: ' + (userdic[m.fromUserId])}</label>
                <Messages id={m.fromUserId} color={index} message={m.text.toString()} isHandled={m.viewed} style={{
                    textAlign: m.fromUserId == id ? 'left' : 'right',
                    width: 'auto',
                }} />
            </div>
        </div>
    ));


    // const contectList = userMessages.map((m, index) => (

    //     <div key={index}>
    //         {console.log('@' + m.fromUserId + '@' + getUserNameFunc(m.fromUserId))}
    //         {console.log(getUserNameFunc(m.fromUserId))}
    //         {userdic[m.fromUserId]}
    //     </div>
    // ));

    async function getUserNameFunc(_id) {
        console.log("🥑  " + typeof (_id))
        console.log(userdic[_id])
        if (userdic[_id] === undefined) {
            if (_id != id) {
                let userName = await GetUserNameById(_id)
                console.log('🍄🍄 userName is: ', userName)
                if (userName != undefined) {
                    let temp = userdic
                    temp[_id] = userName.userName
                    console.log('🍄🍄 temp is: ', temp)
                    setUserdic(temp)
                    console.log(userdic)
                }
            }
            else {
                let temp = userdic;
                temp[_id] = 'you';
                setUserdic(temp);
            }
        }
    }

    async function sendMessageClicked() {
        console.log('in send message click, message is: ' + myMessage)
        if (myMessage === '') {
            setAlertMsg('No message to send!')
            setShowAlert(true)
        }
        else {
            //send the message and update the messages list.
            try {
                const message = {
                    "id": 0,
                    "fromUserId": id,
                    "toUserId": isAdmin ? selectedUser : 20,
                    "text": myMessage,
                    "viewed": true
                }
                const response = await fetch("https://localhost:7275/api/Message/SendNewMessage", {
                    method: 'POST',
                    body: JSON.stringify(message),
                    headers: {
                        'accept': 'text/plain',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();
                console.log('Data recived:', data)
                if (data == true) {
                    console.log('$')
                    setData()
                    setMyMessage('')
                    TextField.value = ''
                }


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

    const handleUserChange = (userId) => {
        console.log('in selection change function', userId)
        setSelectedUser(userId);
        setUserMessages(AllTheUsersMessages.filter(m => m.fromUserId == userId || m.toUserId == userId))
    };

    return (
        <div style={{
            width: "200%",
            display: 'flex',
            flexDirection: 'column'
        }}>

            {isAdmin ?
                <div>
                    <select value={selectedUser} onChange={(ev) => handleUserChange(ev.target.value)}>
                        <option value={selectedUser}>{userdic[selectedUser]}</option>
                        {Object.entries(userdic).map(([userId, userName]) => (
                            <option key={userId} value={userId}>{userName}</option>
                        ))}
                    </select>
                </div>
                : <></>
            }

            <h3>Your messeges:</h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
            }}  >
                {messagesDisplay}
            </div>

            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}

            {userMessages === undefined ?
                <h1>You dont have any mesages yet</h1> : <></>}

            <TextField
                header="Your message"
                type="text"
                label="Enter your message:"
                onChange={(ev) => {
                    setMyMessage(ev.target.value);
                }}
                onBlur={(ev) => {
                    setMyMessage(ev.target.value); // Set the valid input to the name variable
                }}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        sendMessageClicked();
                    }
                }}
                key="textField2" />

            <div onClick={sendMessageClicked}><BasicButtons value="Send Message" /></div>
        </div>
    )
}