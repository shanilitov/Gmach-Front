import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Alert from "./Alert";




export default function DepositDateAndAmount(props) {
  const [DepositAmount, setDepositAmount] = useState(0);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState("00-00-0000");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [allFields, setAllFields] = useState(false);

  const handleAmount = (DepositAmount) => {
    console.log("HandleAmount Son run!", DepositAmount);
    props.onAmount(DepositAmount);
  }

  const handleDate = (date) => {
    console.log("HandleDate son run!", date);
    props.onDate(date);
  }

  React.useEffect(() => {
    if (date > new Date() && DepositAmount > 0 && !error) {
      handleButtonClick();
    }
  }, [date, DepositAmount, error]);


  const handleButtonClick = () => {
    console.log("The function run!");
    console.log("Date: ", date);
    console.log("Amount: ", DepositAmount);
    setAllFields(true);
    if (allFields) {
      props.onFields();
    }
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter amount and date
      </Typography>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard"
        onChange={(ev) => {
          const numberRegex = /^\d+$/;
          if (numberRegex.test(ev.target.value) || ev.target.value === "") {
            setError(false);
            const DepositAmount = parseInt(ev.target.value);
            if (DepositAmount > 0) {
              handleAmount(DepositAmount);
              //cardNumberChangeHandler();
              //setAllFields(true);
            } else {
              setError(true);
              setErrorMsg("Please enter a number greater than 0.");
              setAllFields(false);
            }
          } else {
            setError(true);
            setErrorMsg("Invalid card number format. Please enter numbers only.");
            setAllFields(false);
          }
        }}
      >
        <InputLabel htmlFor="standard-adornment-amount">Deposit amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Date to get my money back
      </Typography>


      <TextField
        id="standard-basic"
        label=""
        type="date"
        variant="standard"
        helperText="Expected withdrawal date."
        func={(ev) => setDate(ev)}
        onChange={(ev) => {
          handleDate(ev.target.value);
          //setShowDate(true);
        }}

      />
      {error ? <Alert severity="error" type="error" msg={errorMsg} /> : null}

    </React.Fragment >

  );
}