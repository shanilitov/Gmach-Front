import React, { useEffect, useState } from "react";
import LoanCard from "./LoanCard";
import moment from "moment";

export default function AllUsersLoansV(props) {
    const [Loans, setLoans] = useState([]);
    const [anyLoans, setAnyLoans] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7275/api/LoanDetails/GetAllApprovaledLoans`);
                const data = await response.json();
                console.log(data);
                setLoans(data);
                if (data.length > 0) {
                    setAnyLoans(true);
                }
            } catch (err) {
                console.log("Error fetching data: ", err);
            }
        };

        fetchData();
    }, []);
  

    /* useEffect(() => {
         try {
         fetchData().then((data) => {
             console.log("Data getr from server is: ", data);
             setLoans(data);
             if (data.length > 0) {
             setAnyLoans(true);
             }
         });
         }
         catch (err) {
         console.log("Error fetching data: ", err);
         }
     }, []);
 */
    function CreateLoansCards() {
        console.log("any Loans: " + anyLoans)
        if (anyLoans) {
            console.log(Loans)
            return Loans.map((loan, index) => (

                <div key={index} style={{backgroundColor:"#00206", padding:"3%", borderRadius:"5%"}}>
                    <LoanCard loan={loan} date={moment(loan.dateToGetBack).format('DD/MM/YYYY')} admin={true} />
                </div>
            ));
        }


    }
    return (
        <>
        <h3>Users loans:</h3>
        {CreateLoansCards()}</>
    )
}