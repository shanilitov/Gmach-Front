import AlignItemsList from "../HelpingComponent/AlignItemsList";
import React,{ useState } from "react"; 

export default function Deposits(props) {
  // TODO: ask from the server for the deposit of the client, and display them in the current template.
  // TODO: add option to open a new investment.

  let type = props.type
  let deposits = props.items
  const [showAlert, setShowAlert] = useState(false);  

    let sums = ["5000$", "10,500$", "32,000$0", "25,000$" ]/*props.sum*/
    let dates = ["25/11/2023", "04/11/2023", "31/12/2023", "01/02/2024" ]/*props.date*/
    let today = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();    
    let i_sums = 0;
    let i_dates = 0;
    
    React.useEffect(() => {
      console.log(i_dates, dates[i_dates])
      if (today === dates[i_dates++] || new Date(today).getTime() > new Date(dates[i_dates++]).getTime()){
        console.log("today === dates[i_dates]: "+today === dates[i_dates])
        console.log("new Date(today).getTime() > new Date(dates[i_dates]).getTime(): "+new Date(today).getTime() > new Date(dates[i_dates]).getTime())
        setShowAlert(true);
      }
    }, [today, dates, i_dates]);


    const depositInfo = sums.map((sum, index) => (
        <div key={index}>
          <AlignItemsList amount={`Deposit amount: ${sum.toString()}`} date={`Withdrawal date: ${new Date(dates[index]).getDate().toString()}/${(new Date(dates[index]).getMonth() + 1).toString()}/${new Date(dates[index]).getFullYear().toString()}`} showAlert={showAlert}/>
        </div>
    ));

  return (
    <div>
      <h2
        style={{
          color: "rgb(0,32,96)",
          gridColumn: "2/span 3",
          gridRow: "1",
        }}
      >
        השקעות
      </h2>
      {depositInfo}
      <p>Want to add a amount for deposit? click <a href="/NewDeposit">here</a>.</p>
    </div>
  )
}