import AlignItemsList from "../HelpingComponent/AlignItemsList";
import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function Deposits(props) {

  const id = props.id
  const name = props.name

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [deposits, setDeposits] = useState([])
  const [userHasDeposits, setUserHasDeposits] = useState(false)

  //ask the user's diposits from the server
  const getUserDeposits = async () => {
    try {
      const response = await fetch(`https://localhost:7275/api/Deposit/AllUserDeposits/${id}`);
      const data = await response.json().then(data => {
        console.log(data)

        if (data.length > 0) {
          console.log(data)
          setDeposits(data)
          setUserHasDeposits(true)
        }
        else {
          setAlertMsg("You don't have any deposits saved in system.")
          setShowAlert(true);
        }
      });
    } catch (error) {
      console.error('Error fetching deposits:', error);
      setErrorMsg("Error fetching deosit: " + error);
      setError(true);
    }
  }

  useEffect(() => {
    async function fetchUserDeposits() {
      const cards = await getUserDeposits();
    }
    console.log("In useEffect")
    fetchUserDeposits();
  }, []);


  const depositInfo = deposits.map((d, index) => (
    <div key={index}>
      <AlignItemsList amount={`Deposit amount: ${d.sum.toString()}`} date={moment(d.DatToPull).format('DD/MM/YYYY')} />
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
      {userHasDeposits ? depositInfo : "loading"}
      <p>Want to add a amount for deposit? click <a href={`/NewDeposit/${id}/${name}`}>here</a>.</p>
    </div>
  )
}