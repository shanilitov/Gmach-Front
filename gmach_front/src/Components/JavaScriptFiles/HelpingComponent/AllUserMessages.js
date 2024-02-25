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
                console.log("in GetAllUsersRequests. data before sent: ", data)
                return data;
            }
        }
        catch (err) {
            console.log("Error in GetAllUsersRequests: ", err);
            setAlertMsg("Error in GetAllUsersRequests: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        }
    }

    //This useEffect funtion gets all users contact requests and diplay them to admin.
    useEffect(() => {
        GetAllUsersRequests().then((data) => {
            console.log('Contact requests: ', data)
            if (data.length > 0) {
                console.log('😎😎Mapped data: ', data)
                setContactRequests(data);
                console.log("End of fetch in admin message")
            }
            else {
                console.log('😫 Error:', data);
                setAlertMsg("Error in GetAllUsersRequests: " + data);
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



    const ShowMessages = contactRequests.map((message, index) => {
        /*<div key={index}>
            {console.log(message.id + " :  " + message)}
            <h3>{message.fullName.toString()} wrote:</h3>
            <Messages id={0} message={`${message.header.toString()} -   ${message.text.toString()}`} />
        </div>  
        */
        <div key={index}>
            {console.log(message)}
            <h3>{message.fullName} wrote:</h3>
            <Messages id={message.fromUserId} color={index} message={`${message.header.toString()} -   ${message.text.toString()}`} />
        </div>
    })




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
        <div key={index} >
            {console.log("##")}
            {console.log(m)}
            <div style={{ display: "inline-block" }}>
            <label key={index}>{'Message From: ' + userdic[m.fromUserId]}</label>
            <Messages id={m.fromUserId} color={index} message={m.text.toString()} isHandled={m.viewed} />
            </div>
        </div>
    ));


    const contectList =userMessages.map((m, index) => (
        
            <div key={index}>
                {console.log('@' + m.fromUserId + '@' + getUserNameFunc(m.fromUserId))}
                {console.log(getUserNameFunc(m.fromUserId))}
                {userdic[m.fromUserId]}
            </div>
        ));

    async function getUserNameFunc(id){
        let userName = await GetUserNameById(id)
        let temp = userdic
        temp[`${id}`] = userName.userName
        setUserdic(temp)
        console.log(userdic)
    }

    const sendMessageClicked = ()=>{
        console.log('in send message click, message is: '+ myMessage)
        if (myMessage === '')
        {
            setAlertMsg('No message to send!')
            setShowAlert(true)
        }
        else{
            //send the message and update the messages list.
        }
    }

    return (
        <div style={{ width: "250%" }}>
            <h3>Your Messages</h3>
            <h3>you have messeges from:</h3>
            {/* {contectList} */}
            {messagesDisplay}


            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}
            
            
            {ShowMessages}
            {isRequest ? messages : null}
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
            key="textField2"/>
            <div onClick={sendMessageClicked}><BasicButtons value="Send Message" /></div>
        </div>
    )
}