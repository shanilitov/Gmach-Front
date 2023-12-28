import React, { useEffect, useState } from "react";
import LoanCard from "./LoanCard";


export default function AllUsersLoansV(props) {
    const [Loans, setLoans] = useState([]);
    const [anyLoans, setAnyLoans] = useState(false);
    const userId = props.userId;
    const userName = props.userName;

    const getApprovaledLoans = async () => {
        const response = await fetch(`https://localhost:7275/api/LoanDetails/GetUserLoans/${userId}`);

    };

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

                <div key={index}>
                    <LoanCard loan={loan} date={moment(loan.dateToGetBack).format('DD/MM/YYYY')} />
                </div>
            ));
        }


    }
    return (
        <></>
    )
}