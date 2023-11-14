import AlignItemsList from "../HelpingComponent/AlignItemsList"
import Asynchronous from "../HelpingComponent/AsynchronousFeild"
import LoanCard from "../HelpingComponent/LoanCard"

export default function Loans(props) {
  // TODO: Ask from the server for the client real loans, and change the displaytion to them.
  // TODO: change the addLoan to a nicer view.
  // TODO: add option to see the state of loan application.
  let type = props.type
  //let Loans = props.items
  let Loans = ["50000", "10000", "2000", "22000" ]/*props.sum*/
  let Dates = ["16/11/2023", "4/11/2023", "30/12/2023", "01/02/2024" ]/*props.date*/ 

  const LoansInfo = Loans.map((loan, index) => (
    console.log("Index is: "+index),
    <div key={index}>
      <LoanCard loan = {Loans[index]} date = {Dates[index]}/>
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