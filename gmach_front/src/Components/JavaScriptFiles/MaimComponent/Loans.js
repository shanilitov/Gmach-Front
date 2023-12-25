import AlignItemsList from "../HelpingComponent/AlignItemsList"
import Asynchronous from "../HelpingComponent/AsynchronousFeild"
import LoanCard from "../HelpingComponent/LoanCard"
import { useState } from "react";
import { useEffect } from "react";
import Alert from "../HelpingComponent/Alert";
import { useParams } from "react-router-dom";
import moment from 'moment';

export default function Loans(props) {
  // TODO: Ask from the server for the client real loans, and change the displaytion to them.
  // TODO: change the addLoan to a nicer view.
  // TODO: add option to see the state of loan application.

  const { id } = useParams()
  const { name } = useParams();
  console.log("Id is: ", id)

  const [Dates, setDates] = useState([])
  const [Loans, setLoans] = useState([]);
  const [anyLoans, setAnyLoans] = useState(false)
  const [ShowAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")
  const [Error, setError] = useState(false)
  const [ErrorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://localhost:7275/api/LoanDetails/GetUserLoans/${id}`);
        const data = await response.json().then(data => {
          console.log( data)

          if (data.length > 0) {
            console.log(data)
            setLoans(data)
            setAnyLoans(true)
          }
          else {
            setAlertMsg("No loans in your account.")
            setShowAlert(true)
          }
        });
      }
      catch (error) {
        console.log("Error: " + error);
        setErrorMsg(error);
        setError(true);
      }
    }


    fetchLoans();
  }, [id]); // This will run the effect when the component loads and whenever `id` changes


  const LoansInfo = CreateLoansCards()

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
      {anyLoans ? <div>{LoansInfo}</div> : "Loading..."}


      {ShowAlert ? <Alert type="info" msg="No loans in your account." /> : null}
      {Error ? <Alert type="error" msg={ErrorMsg} /> : null}

      <p>Need a loan? click <a href={`/AddLoan/${id}`}>here.</a></p>
    </div>
  )
}