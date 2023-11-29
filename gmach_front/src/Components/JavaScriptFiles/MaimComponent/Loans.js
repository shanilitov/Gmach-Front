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
  let type = props.type
  let user = props.user
  console.log("User is: ", user)
  let id = user.id
  console.log("Id is: ", id)  

  const [Dates, setDates] = useState([])
  const [Loans, setLoans] = useState(null);
  const [ShowAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://localhost:7275/api/GetUserLoans/${id}`);
        const data = await response.json();
        if (data === null) {
          setShowAlert(true)
        }
        console.log("Server responsed!! Data: " + JSON.stringify(data));
        if (Loans.length === 0) {
          console.log("No loans!")
        }
        if (Loans.length < 0) {
          console.log("Error in server!")
        }
      }
      catch (error) {
        console.log("Error: " + error)
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
        console.log("Loans is null","ShowAlert is: ",ShowAlert),<h3>No Loans in your account</h3>) :  
                Loans.length === 0 ? (
          console.log("Loans is empty","ShowAlert is: ",ShowAlert)) :
           Loans != null ? (
          console.log("Loans is not empty", "ShowAlert is: ",ShowAlert),
          <div>{LoansInfo}</div>
        ) : <></>
      }

      {ShowAlert ? <Alert type="info" msg="No loans in your account." /> : null}

      <p>Need a loan? click <a href="/AddLoan">here.</a></p>
    </div>
  )
}