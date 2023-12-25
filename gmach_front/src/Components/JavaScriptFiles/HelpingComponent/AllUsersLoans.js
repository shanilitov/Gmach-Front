import React, { useEffect, useState } from "react";
import Table from "./DataTable";
import Alert from "./Alert";


export default function AllUsersDeposits(props) {
    const [LoanRequests, setLoanRequests] = useState([]);
    const titles = ["RequestId","Sum", "Return date", "UserID"]
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    let isAdmin = props.admin;

    useEffect(() => {
        try {
            fetchData().then((data) => {
                console.log("Data getr from server is: ", data);
                setLoanRequests(data);
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
    }, []);



    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7275/api/LoanDetails/GetAll");
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

        <div style={{ width: "250%" }}>
            <h3>Loan Requests</h3>
            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}
            <Table titles={titles} data={LoanRequests} />
            {"isAdmin: "+ isAdmin}
        </div>


    )
}







