import AlignItemsList from "../HelpingComponent/AlignItemsList"
import Asynchronous from "../HelpingComponent/AsynchronousFeild"
import LoanCard from "../HelpingComponent/LoanCard"
import { useState } from "react";
import { useEffect } from "react";
import Alert from "../HelpingComponent/Alert";

export default function Loans(props) {
  // TODO: Ask from the server for the client real loans, and change the displaytion to them.
  // TODO: change the addLoan to a nicer view.
  // TODO: add option to see the state of loan application.
  
  const id = props.id
  console.log("Id is: ", id)  

  const [Dates, setDates] = useState([])
  const [Loans, setLoans] = useState(null);
  const [ShowAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [Error, setError] = useState(false) 
  const [ErrorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://localhost:7275/api/LoanDetails/GetUserLoans/${id}`);
        console.log("fetch is in: ", `https://localhost:7275/api/LoanDetails/GetUserLoans/${id}`)
        if (response == null || response.length === 0) {
          setAlertMsg("No loans in your account.")
          setShowAlert(true)
        }
        else{
          const data = response.json();
          console.log("Server responsed!! Data: " + JSON.stringify(data));

        }
        
             }
      catch (error) {
        console.log("Error: " + error);
        setErrorMsg(error);
        setError(true);
      }
    }


    fetchLoans();
  }, [id]); // This will run the effect when the component loads and whenever `id` changes


  /*fetch(`https://localhost:7275/api/GetUserLoans/${id}`, {//TODO: Add useParams() to get the id of the user.
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  })*/

  const LoansInfo = CreateLoansCards()

  function CreateLoansCards() {
    if (Loans != null) {
      return Loans.map((loan, index) => (
        console.log("Index is: " + index),
        <div key={index}>
          <LoanCard loan={loan} date={loan.DateToGetBack} />
        </div>
      ));
    }


  }


  return (
    <div>
      <h2
        style={{
          color: "rgb(0,32,96)",
          gridColumn: "1/span 2",
          gridRow: "1",
        }}
      >
        Loans
      </h2>
      {Loans === null ? (
        console.log("Loans is null","ShowAlert is: ",ShowAlert)) :  
                Loans.length === 0 ? (
          console.log("Loans is empty","ShowAlert is: ",ShowAlert)) :
           Loans != null ? (
          console.log("Loans is not empty", "ShowAlert is: ",ShowAlert),
          <div>{LoansInfo}</div>
        ) : <></>
      }

      {ShowAlert ? <Alert type="info" msg="No loans in your account." /> : null}
      {Error ? <Alert type="error" msg={ErrorMsg} /> : null}

      <p>Need a loan? click <a href="/AddLoan">here.</a></p>
    </div>
  )
}