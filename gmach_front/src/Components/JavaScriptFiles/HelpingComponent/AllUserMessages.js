import React, { useEffect, useState } from "react";

export default function AllUserMessages(props){
    const id = props.id
    const [Messages, setMessages] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");


    useEffect(() => {

        console.log("in alluserMessages")
        try {
            fetchData().then((data) => {
                console.log("Data got from server is: ", data);
                setMessages(data);
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
            const response = await fetch(`https://localhost:7275/api/Message/GetMessagesByUserId?id=${id}`);
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

    return (
        <div style={{ width: "250%" }}>
            <h3>Your Messages</h3>
            {Messages.map((m)=>{
                <Messages id={m.FromUserId} message={m.Text} viewed={m.Viewed}/>
            })}
        </div>
    )
}