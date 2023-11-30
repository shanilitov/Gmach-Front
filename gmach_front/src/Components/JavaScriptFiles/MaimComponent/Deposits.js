import AlignItemsList from "../HelpingComponent/AlignItemsList";
import React, { useState } from "react";
import moment from 'moment';

export default function Deposits(props) {
  // TODO: ask from the server for the deposit of the client, and display them in the current template.
  // TODO: add option to open a new investment.
  //console.log(new Date().getDate())
  let type = props.type
  let deposits = props.items
  const [showAlert, setShowAlert] = useState(false);

  let sums = ["5000", "10500", "32000", "225000"]/*props.sum*/
  let dates = ["25/11/2023", "04/11/2023", "30/12/2023", "01/02/2024"]/*props.date*/ //TODO: Check why the date is not displayed correctly.
  let today = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
  let i_sums = 0;
  let i_dates = 0;



  const depositInfo = sums.map((sum, index) => (
    console.log("Before sent:\nDate is: " + dates[index]),
    console.log("Index is: " + index),
    <div key={index}>
      <AlignItemsList amount={`Deposit amount: ${sum.toString()}`} date={moment(dates[index], 'DD/MM/YYYY').format('DD/MM/YYYY')} />
      <div className="SpaceBetweenCards"></div>
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
        Deposits
      </h2>
      {depositInfo}
      <p>Want to add a amount for deposit? click <a href="/NewDeposit">here</a>.</p>
    </div>
  )
}