import React, { useEffect, useState } from "react";
import Table from "./DataTable";
import Alert from "./Alert";


export default function AllUsersDeposits(props) {
    const [LoanRequests, setLoanRequests] = useState([]);
    const titles = ["RequestId","Sum", "Return date", "UserID"]
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    //const [allData, setAllData] = useState([]);
    const token = localStorage.getItem('token')
    let isAdmin = props.admin;

    useEffect(() => {
        try {
            fetchData().then((data) => {
                console.log("Data got from server is: ", data);
                console.log("check: ", data[0].guarantors[0].check)
                setLoanRequests(data);
                console.log("LoanRequests: ", LoanRequests, " data: ", data);
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
            const response = await fetch("https://localhost:7275/api/LoanDetails/GetAllNotApprovaledLoans", {
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



    return (

        <div style={{ width: "250%" }}>
            <h3>Loan Requests</h3>
            {showAlert ? <Alert msg={alertMsg} type="error" /> : null}
            <Table titles={titles} data={LoanRequests} />
            {"isAdmin: "+ isAdmin}
        </div>


    )
}







