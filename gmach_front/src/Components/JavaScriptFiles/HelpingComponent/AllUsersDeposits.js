import React, { useContext, useEffect, useState } from "react";
import Table from "./DataTable";
import Alert from "./Alert";
import { get } from "jquery";

/**
 * Renders a component that displays all users' deposits.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.admin - Indicates whether the user is an admin or not.
 * @returns {JSX.Element|null} The rendered component.
 */
function AllUsersDeposits(props) {
    const [deposits, setDeposits] = useState([]);
    const [loans, setLoans] = useState([]);
    const titles = ["DepositId", "Amount", "Return date", "UserID"];
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [loansSum, setLoansSum] = useState(0);
    const [total, setTotal] = useState(0);

    let isAdmin = props.admin;


    /**
     * Fetches all deposits from the server.
     * @returns {Promise<Object[]>} The fetched deposits.
     * @throws {Error} If the server returns an error.
     * @async
     */
    useEffect(() => {
        try {
            fetchData().then((data) => {
                console.log("Data got from server is: ", data);
                setDeposits(data);
                let loansSum = 0;
                if (data.length > 0) {
                    let sum = sumAllDeposits(data);
                    getLoans().then((fetchedLoans) => {
                        console.log("💒💒 loans that were fetched: ", fetchedLoans);
                        if (fetchedLoans.length > 0) {
                            setLoans(fetchedLoans);
                            loansSum = calculateLoansSum(fetchedLoans);
                            console.log("🌵🌵🌵🌵🌵  loansSum: ", loansSum);
                        }
                        console.log("🎈 loansSum: ", loansSum, " sum: ", sum);
                        setTotal(parseFloat(sum) - parseFloat(loansSum));
                    });
                } else {
                    setTotal(0);
                }
            });
        } catch (err) {
            console.log("Error fetching loans data: ", err);
            setAlertMsg("Error fetching loans data: " + err);
        }
    }, []);

    /**
     * 
     * @returns {Promise<Object[]>} The fetched deposits.
     * @throws {Error} If the server returns an error.
     * @async
     */
    async function fetchData() {
        try {
            const response = await fetch("https://localhost:7275/api/Deposit/GetAll");
            const data = await response.json();
            return data;
        } catch (err) {
            console.log("Error fetching data: ", err);
            setAlertMsg("Error fetching data: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }

    /**
     * 
     * @returns {Promise<number>} The sum of all loans.
     * @throws {Error} If the server returns an error.
     * @async
     * 
     * @todo Change the URL to the correct one.
     */

    async function getLoans() {
        try {
            const response = await fetch("https://localhost:7275/api/LoanDetails/GetAllApprovaledLoans");
            const data = await response.json();
            console.log("🎶🎶🎶 is data iPromise??? ", data);
            if (data.length > 0) {
                console.log("🌵  data in getLoansSum(): ", data);
                setLoans(data);
                return data;
            }
            else {

            }
        } catch (err) {
            console.log("Error fetching data: ", err);
            setAlertMsg("Error fetching data: " + err);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }

    function sumAllDeposits(deposits) {
        let sum = 0;
        deposits.forEach((deposit) => {
            sum += parseFloat(deposit.sum);
        });
        console.log("🙏 sum in sumAllDeposits: ", sum);
        return sum;
    }

    function calculateLoansSum(loans) {
        let sum = 0;
        if (Array.isArray(loans) && loans.length > 0) {
            loans.forEach((loan) => {
                sum += parseFloat(loan.sum);
            });
        }
        console.log("📜  sum in calculateLoansSum(): ", sum);
        return sum;
    }

    return (
        (isAdmin ?
            <>
                <div style={{ width: "250%" }}>
                    {showAlert ? <Alert type="error" msg={alertMsg} /> : null}
                    <Table deposits={deposits} titles={titles} />
                    <div style={{ backgroundColor: "rgba(223, 221, 53, 0.5)", height: "10%", margin: "3%", padding: "1%" }}>
                        <h3>Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                        <h5>Total deposits only: {sumAllDeposits(deposits).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
                    </div>
                </div>
            </> : null)
    );
};

export default AllUsersDeposits;
