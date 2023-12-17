import React, { useEffect, useState } from "react";
import Table from "./DataTable";
import Alert from "./Alert";


// Fetch data from the API



function AllUsersDeposits(props) {
    const [deposits, setDeposits] = useState([]);
    const titles = ["amount", "Return date", "UserID"]
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    let isAdmin = props.admin;


    try {
        fetchData().then((data) => {
            console.log("Data getr from server is: ", data);
            setDeposits(data);
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

    /* useEffect(() => {
         fetch("https://localhost:7275/api/Deposit/GetAll")
             .then((response) => response.json())
             .then((data) => {
                 setDeposits(data);
             })
             .catch((error) => {
                 console.error("Error fetching deposits:", error);
                 // Handle error here
             });
     }, []);*/


    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7275/api/Deposit/GetAll");
            const data = await response.json();
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
        (isAdmin ?
            < >
                <div style={{ width: "250%" }}>
                    {showAlert ? <Alert type="error" msg={alertMsg} /> : null}
                    <Table deposits={deposits} /></div>
            </> : null)
    );
};

export default AllUsersDeposits;



/**
 * {deposits.map((deposit) => (
                        <tr key={deposit.id} onClick={() => handleRowClick(deposit)}>
                            <td>{deposit.user}</td>
                            <td>{deposit.amount}</td>
                            <td>{deposit.date}</td>
                        </tr>
                    ))}
 */