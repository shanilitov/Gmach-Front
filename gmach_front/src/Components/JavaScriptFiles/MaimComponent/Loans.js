import AlignItemsList from "../HelpingComponent/AlignItemsList"
import Asynchronous from "../HelpingComponent/AsynchronousFeild"
import LoanCard from "../HelpingComponent/LoanCard"

export default function Loans(props) {
  // TODO: Ask from the server for the client real loans, and change the displaytion to them.
  // TODO: change the addLoan to a nicer view.
  // TODO: add option to see the state of loan application.
  let type = props.type
  let id = props.id
  //let Loans = props.items
  const [Loans, setLoans] = React.useState([])
  const [Dates, setDates] = React.useState([])

  fetch(`https://localhost:7275/api/LoanDetails/${id}`, {//TODO: Add useParams() to get the id of the user.
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  })
    .then((response) => {
      response.json().then((data) => {
        console.log("Server responsed!! Data: " + JSON.stringify(data));
        setLoans(data);
        if (length(Loans) === 0) {
          console.log("No loans!")
        }
        if (length(Loans) < 0) {
          console.log("Error in server!")
        }

      }
        , (error) => {
          console.log("Error: " + error)
        })

        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          console.log("Finally");
        });
    })



  const LoansInfo = Loans.map((loan, index) => (
    console.log("Index is: " + index),
    <div key={index}>
      <LoanCard loan={Loans[index]} date={Dates[index]} />
    </div>
  ));



  return (
    <div>
      <h2
        style={{
          color: "rgb(0,32,96)",
          gridColumn: "1/span 2",
          gridRow: "1",
        }}
      >
        הלוואות
      </h2>
      {LoansInfo}
      <p>Need a loan? click <a href="/AddLoan">here.</a></p>
    </div>
  )
}