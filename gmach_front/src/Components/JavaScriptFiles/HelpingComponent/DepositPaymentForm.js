import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorAlert from './ErrorAlert';
import { Select } from '@mui/material';

import SelectAPayment from './SelectAPayment';
import { useState } from 'react'; // Import the useState hook from the react package
import { CreditCard } from '@mui/icons-material';
import CreditCardDisplay from './CreditCardDisplay';


export default function DepositPaymentForm(props) {
  const userID = props.userID;
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [allFields, setAllFields] = React.useState(false);
  const [check, setChecked] = React.useState(true); // If user want to save the credit card details or not. 
  const [Payment, set_Payment] = React.useState(1); // Set the initial value to 1. 1 = Add a new payment details, 2 = Use an exist card.

  //TODO: Don't forget to delete the credit card 
  const creditCardsArray = ["1522859960247532", "1234589672341025"]
  const [UserCards, setUserCards] = useState([]);

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
    console.log("check value: ", error);
    setAllFields(true);
    props.onFields();

    //onInput([cardName, cardNumber, expDate, cvv]);
  };

  const cardNameChangeHandler = () => {
    props.onCardName(cardName);
  }

  const cardNumberChangeHandler = () => {
    props.onCardNumber(cardNumber);
  }

  const expDateChangeHandler = () => {
    props.onExpDate(expDate);
  }

  const cvvChangeHandler = () => {
    props.onCvv(cvv);
  }

  const handleChange = () => {
    const newCheck = !check; // Toggle the value of check
    setChecked(newCheck);
    console.log("checked (new): ", newCheck); // Use the updated value of check
    props.checkBox(newCheck);
  };


  const handlePayment = (value) => {
    console.log("handlePayment run!");
    console.log(value)
    if (value === 1) {
      handleCard("");
      set_Payment(value);
    }
    else {
      set_Payment(value);
      console.log("PaymentHandler run! value is: ", value, " Payment is: ", Payment);
    }
  }

  const handleCard = (value) => {
    console.log("vCard value ", value, " value == null: ", value == null, " value == '': ", value == "")
    props.onExistingCard(value);
  }

  const handleCardId = (value) => {
    console.log("😉 in handleCardId at DepositPaymentForm")
    props.onCardId(value);
  }




  return (
    <div>
      <React.Fragment>
        <div style={{ marginBottom: "5%" }}>
          <Typography variant="h6" gutterBottom style={{ display: "inline-block", marginTop: "2%" }}>
            Payment method
          </Typography>
          <div style={{ display: "inline-block", marginLeft: "4%", }} >
            <SelectAPayment setPayment={handlePayment} />
          </div>
        </div>{Payment === 1 ? (<Grid container spacing={3}>
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
                if (cardName.length === 0 || cardName == " " || cardName == null) {
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
                if (cardNumber.length === 0 || cardNumber == " " || cardNumber == null) {
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
                if (expDate.length === 0 || expDate == " " || expDate == null) {
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
                if (cvv.length === 0 || cvv == " " || cvv == null) {
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
        </Grid>) : (<>
          <CreditCardDisplay numbers={creditCardsArray} setCard={handleCard} setCardId={handleCardId} userID={userID} />
          <Grid item xs={12} md={6}>
          </Grid>
        </>)}
      </React.Fragment>
    </div>
  );
}
