import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Messages from "./Messages";

export default function AllUserMessages(props) {
    const id = props.id
    const [userMessages, setUserMessages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const token = localStorage.getItem('token')



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

    const messagesDisplay = userMessages.map((m, index) => (
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
            {userMessages === undefined ?
                <h1>You dont have any mesages yet</h1> : <></>}
        </div>
    )
}