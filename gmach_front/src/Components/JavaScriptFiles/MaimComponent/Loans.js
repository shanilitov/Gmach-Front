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
  let id = 1

  const [Dates, setDates] = useState([])
  const [Loans, setLoans] = useState(null);
  const [Alert, setAlert] = useState(false)

  useEffect(() => {
      const fetchLoans = async () => {
        try{
      const response = await fetch(`https://localhost:7275/api/GetUserLoans/${id}`);
      const data = await response.json();
      console.log("Server responsed!! Data: " + JSON.stringify(data));
      setLoans(data);
      if (Loans.length === 0) {
        console.log("No loans!")
        setAlert(true)
      }
      if (Loans.length < 0) {
        console.log("Error in server!")
      }
    }
    catch(error){
        console.log("Error: " + error)
      }}


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

function CreateLoansCards(){
  if (Loans.length >0) {
    return   Loans.map((loan, index) => (
      console.log("Index is: " + index),
      <div key={index}>
        <LoanCard loan={Loans[index]} date={Dates[index]} />
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
      <div>Loading...</div>
    ) : Loans.length === 0 ? (
      <div>{Alert ? <Alert type="info" msg="No loans in your account." /> : null}</div>
    ) : Loans.length >0?(
      <div>{LoansInfo}</div>
    ):<></>
    }


    <p>Need a loan? click <a href="/AddLoan">here.</a></p>
  </div>
)
}