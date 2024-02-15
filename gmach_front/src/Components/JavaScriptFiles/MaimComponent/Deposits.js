import AlignItemsList from "../HelpingComponent/AlignItemsList";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import Alert from "../HelpingComponent/Alert";


export default function Deposits(props) {

  const id = props.id
  const name = props.name

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [deposits, setDeposits] = useState([])
  const [userHasDeposits, setUserHasDeposits] = useState(false)
  const token = localStorage.getItem('token')

  //ask the user's diposits from the server
  const getUserDeposits = async () => {
    try {
      const response = await fetch(`https://localhost:7275/api/Deposit/AllUserDeposits/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await response.json().then(data => {
        console.log(data)
        if (data.length > 0) {
          console.log("data.length > 0 is TRUE!!")
          setDeposits(data)
          setUserHasDeposits(true)
          setTimeout(() => {
            return data
          }, 1000);
        }
        else {
          setAlertMsg("You don't have any deposits saved in system.")
          if (data.length <= 0)
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
      console.log("Cards are: ", cards)
      if (cards) {
        setDeposits(cards);
      }
      else {
        if (userHasDeposits == false || cards == undefined) {
          console.log("useEffect :: User doesn't have any cards!! Show alert. 🤐: "+userHasDeposits)
          setAlertMsg("useEffect :: You don't have any deposits in your account.")
          setShowAlert(true);
        }

      }
    }
    console.log("In useEffect")
    fetchUserDeposits();
  }, []);


  const depositInfo = deposits.map((d, index) => (
    <div key={index}>
      <AlignItemsList amount={`Deposit amount: ${d.sum.toString()}`} date={moment(d.dateToPull).format('DD/MM/YYYY')} />
      <div className="SpaceBetweenCards"></div>
    </div>
  ));

  return (
    <div>
      {/*<p
        style={{
          color: "rgb(0,32,96)",
          gridColumn: "2/span 3",
          gridRow: "1",
          fontSize: "20px",
        }}
      >
        <strong>Deposits</strong>
        
      </p>*/}
      {userHasDeposits ? depositInfo : null}
      {showAlert ? <Alert type="info" msg={alertMsg} /> : null}
      <p>Want to add a amount for deposit? click <a href={`/NewDeposit/${id}/${name}`}>here</a>.</p>
    </div>
  )
}