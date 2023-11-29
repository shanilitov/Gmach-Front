import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorAlert from './ErrorAlert';

export default function DepositPaymentForm() {

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            type='text'
            onChange={(ev) => {
              const englishTextRegex = /^[A-Za-z]+$/;
              if (englishTextRegex.test(ev.target.value)||ev.target.value==="") {
                setError(false);
              }
              else{
                setError(true);
                setErrorMsg("Card name must be in English letters only");
              
              }
            }}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            inputProps={{ inputMode: 'numeric' }}
            onChange={(ev) => {
              const numberRegex = /^[0-9]+$/;
              if (numberRegex.test(ev.target.value) || ev.target.value === "") {
                setError(false);
              } else {
                setError(true);
                setErrorMsg("Card name must contain only numbers");
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(ev) => {
              const dateRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
              if (dateRegex.test(ev.target.value) || ev.target.value === "") {
                setError(false);
              } else {
                setError(true);
                setErrorMsg("Invalid date format. Please use MM/YY or MM/YYYY");
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={(ev) => {
              const numberRegex = /^\d{3}$/;
              if (numberRegex.test(ev.target.value) || ev.target.value === "") {
                setError(false);
              } else {
                setError(true);
                setErrorMsg("Card name must contain only 3 digits");
              }
            }}
          />
        </Grid>
    
        {error ?(<ErrorAlert msg={errorMsg}/>):(<></>)} 
      </Grid>
      
    </React.Fragment>
  );
}