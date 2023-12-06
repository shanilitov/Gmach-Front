import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorAlert from './ErrorAlert';

export default function DepositPaymentForm(props) {

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [allFields, setAllFields] = React.useState(false);

  React.useEffect(() => {
    if (cardName && cardNumber && expDate && cvv && !error) {
      handleButtonClick();
    }
  }, [cardName, cardNumber, expDate, cvv, error]);


  const handleButtonClick = () => {
    console.log("The function run!");
    console.log("cardName: ", cardName);
    console.log("cardNumber: ", cardNumber);
    console.log("expDate: ", expDate);
    console.log("cvv: ", cvv);
    setAllFields(true);
    props.onFields();

    //onInput([cardName, cardNumber, expDate, cvv]);
  };

  const cardNameChangeHandler = () => {
    console.log("son. cardNameChangeHandler run!")
    props.onCardName(cardName);
  }

  const cardNumberChangeHandler = () => {
    console.log("son. cardNumberChangeHandler run!")
    props.onCardNumber(cardNumber);
  }

  const expDateChangeHandler = () => {
    console.log("son. expDateChangeHandler run!")
    props.onExpDate(expDate);
  }

  const cvvChangeHandler = () => {
    console.log("son. cvvChangeHandler run!")
    props.onCvv(cvv);
  }


  return (
    <div>
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
                const englishTextRegex = /^[A-Za-z\s]+$/;
                if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                  setCardName(ev.target.value);
                  setError(false);
                  cardNameChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Card name must be in English letters only");
                }
                if(cardName.length === 0 || cardName==" " || cardName== null){
                  setAllFields(false);
                }
              }}
              //I added onBlur function in order to include the last char also.
              onBlur={(ev) => {
                const englishTextRegex = /^[A-Za-z\s]+$/;
                if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                  setCardName(ev.target.value);
                  setError(false);
                  cardNameChangeHandler();
                }
                else {
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
                const numberRegex = /^\d{4}(-\d{4}){3}$|^\d{16}$/;
                if (numberRegex.test(ev.target.value) || ev.target.value === "") {
                  setError(false);
                  setCardNumber(ev.target.value);
                  cardNumberChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Invalid card number format. Please use XXXX-XXXX-XXXX-XXXX or XXXXXXXXXXXXXXXX");
                }
                if(cardNumber.length === 0 || cardNumber==" " || cardNumber== null){
                  setAllFields(false);
                }
              }}
              onBlur={(ev) => {
                const numberRegex = /^\d{4}(-\d{4}){3}$|^\d{16}$/;
                if (numberRegex.test(ev.target.value) || ev.target.value === "") {
                  setError(false);
                  setCardNumber(ev.target.value);
                  cardNumberChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Invalid card number format. Please use XXXX-XXXX-XXXX-XXXX or XXXXXXXXXXXXXXXX");
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
                  setExpDate(ev.target.value);
                  expDateChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Invalid date format. Please use MM/YY or MM/YYYY");
                }
                if(expDate.length === 0 || expDate==" " || expDate== null ){
                  setAllFields(false);
                }
              }}
              onBlur={(ev) => {
                const dateRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
                if (dateRegex.test(ev.target.value) || ev.target.value === "") {
                  setError(false);
                  setExpDate(ev.target.value);
                  expDateChangeHandler();
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
                const numberRegex = /^\d{0,3}$/;
                if (numberRegex.test(ev.target.value)) {
                  setError(false);
                  setCvv(ev.target.value);
                  cvvChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Card name must contain only 3 digits");
                }
                if(cvv.length === 0 || cvv==" " || cvv== null){
                  setAllFields(false);
                }
              }}
              onBlur={(ev) => {
                const numberRegex = /^\d{0,3}$/;
                if (numberRegex.test(ev.target.value)) {
                  setError(false);
                  setCvv(ev.target.value);
                  cvvChangeHandler();
                } else {
                  setError(true);
                  setErrorMsg("Card name must contain only 3 digits");
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {error ? (<ErrorAlert msg={errorMsg} />) : (<></>)}
          </Grid>
        </Grid>
      </React.Fragment>
    </div>
  );
}
