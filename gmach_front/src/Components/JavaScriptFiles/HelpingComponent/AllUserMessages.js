import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Messages from "./Messages";
import GetUserNameById from "./GetUserNameById";
import TextField from '@mui/material/TextField';
import BasicButtons from "./BasicButtons";
import WaitComponent from './WaitComponent';

export default function AllUserMessages(props) {
    const id = props.id
    const [userMessages, setUserMessages] = useState([]);
    const [contactRequests, setContactRequests] = useState([]);
    const [isRequest, setIsRequest] = useState(false);  //if there are contact requests
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem('token');
    const [userdic, setUserdic] = useState({});
    const [myMessage, setMyMessage] = useState('');

    //for admin state:
    const isAdmin = id == 20;
    const [selectedUser, setSelectedUser] = useState("");
    const [AllTheUsersMessages, setAllTheUsersMessages] = useState([])
    const [update, setUpdate] = useState(true)

    let messages = {}
    let userNames = {}



    //This useEffect function run fetchData() and messagesDisplay() to display all user messages.
    useEffect(() => {
        if (update)
            setData()
        setTimeout(() => {
            setUpdate(false)
        }, 500);

    }, [])

    function setData() {

        console.log("in alluserMessages")
        try {
            fetchData().then((data) => {
                console.log("Data got from server is: ", data);
                setUserMessages(data);
                data.map(m => (
                    AddUserNameToUserDic(m.fromUserId)
                ))
                setTimeout(() => {
                    console.log("userNames: ", userdic)
                    setUpdate(false)
                }, 2000);

                if (isAdmin) {
                    setSelectedUser(20)
                    handleUserChange(20)
                    setAllTheUsersMessages(data)
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


    async function AddUserNameToUserDic(userId) {
        try {
            fetch(`https://localhost:7275/api/User/GetUserName/${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Name is: ", data)
                    userdic[userId] = data.userName
                })
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
            {console.log('userNames', userNames)}
            {console.log(userdic[m.fromUserId] === undefined ? `read the user name` : userdic[m.fromUserId])}
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
                    //   window.location.reload();
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
        // setUpdate(true)
    };

    return (
        <div style={{
            width: "auto",
            display: 'flex',
            flexDirection: 'column'
        }}>
            {!update ? <>

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

                <h3>Your messages:</h3>

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
            </> : <WaitComponent />}

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
                        ev.value = '';
                    }
                }}
                key="textField2" />

            <div onClick={sendMessageClicked}><BasicButtons value="Send Message" /></div>
        </div>
    )
}