// @ts-nocheck

import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Details from '../HelpingComponent/Details';
import DepositPaymentForm from '../HelpingComponent/DepositPaymentForm';
import DepositDateAndAmount from '../HelpingComponent/DepositDateAndAmount';
import ReviewDeposit from '../HelpingComponent/ReviewDeposit';
import { Payment } from '@mui/icons-material';
import BasicButtons from '../HelpingComponent/BasicButtons';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        PlusMinus.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function NewDeposit() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");// A new card number
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [allFields, setAllFields] = React.useState(false);
  const [depositAmount, setDepositAmount] = React.useState("");
  const [depositReturnDate, setDepositReturnDate] = React.useState("");
  const [check, setChecked] = React.useState(true); // Define the 'checked' variable
  const [card, setCard] = React.useState(""); // A card number from the DB
  const [successed, setSuccessed] = React.useState(false)//If deposit entered to DB successfuly 
  const [error, setError] = React.useState("")
  const id = useParams();
  const name = useParams();

  const [fullCard, setFullCard] = React.useState({})

  const steps = ['Payment details', 'Amount and date', 'Review details'];
  const token = localStorage.getItem('token')

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep > 1) {
      console.log("activeStep > 1");
      setAllFields(true);
    }
    setAllFields(false);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    console.log("Card: ", card)
  };



  function getStepContent(step) {
    switch (step) {
      case 0:
        // return <Details />;
        return <DepositPaymentForm onCardName={cardNameHandler} onCardNumber={cardNumberHandler} onExpDate={expDateHandler} onCvv={cvvHandler} onFields={handleButtonShow} checkBox={CheckboxHandler} userID={id} onExistingCard={handleCard} />;
      case 1:
        return <DepositDateAndAmount onAmount={depositAmountHandler} onDate={depositReturnDateHandler} onFields={handleButtonShow} />;
      case 2:
        return <ReviewDeposit amount={depositAmount} date={depositReturnDate} expDate={expDate} cardNumber={cardNumber} />;
      default:
        throw new Error('Unknown step');

    }
  }


  //All this functions are for the child components input
  const cardNameHandler = (cardName) => {
    console.log("Father. cardNameHandler run!", cardName)
    setCardName(cardName);
  }

  const cardNumberHandler = (cardNumber) => {
    console.log("Father. cardNumberHandler run!", cardNumber)
    setCardNumber(cardNumber);
  }

  const expDateHandler = (expDate) => {
    console.log("Father. expDateHandler run!", expDate)
    setExpDate(expDate);
  }

  const cvvHandler = (cvv) => {
    console.log("Father. cvvHandler run!", cvv)
    setCvv(cvv);
  }

  const depositAmountHandler = (depositAmount) => {
    console.log("Father. depositAmountHandler run!", depositAmount)
    setDepositAmount(depositAmount);
    if (depositAmount && (depositAmount != "") || (depositAmount != null)) {
      setAllFields(true);
    }
  }

  const depositReturnDateHandler = (depositReturnDate) => {

    console.log("Father. depositReturnDateHandler run!", depositReturnDate)
    setDepositReturnDate(depositReturnDate);
    if (depositReturnDate && (depositAmount != "") || (depositAmount != null)) {
      setAllFields(true);
    }
  }

  const CheckboxHandler = (checkbox) => {
    console.log("Father. CheckboxHandler run!", checkbox)
    setChecked(checkbox);
  }

  const handleCard = (card) => {
    console.log("Father. handleCard run!", card)
    if (card != "") {
      setCard(card);
      setCardNumber(card);

    }
  }
  //This function is for the button. It checks if all the fields are full and if so, it shows the button.
  const handleButtonShow = () => {
    console.log("The handleButtonShow run at father!");
    console.log("cardName: ", cardName);
    console.log("cardNumber: ", cardNumber);
    console.log("expDate: ", expDate);
    console.log("cvv: ", cvv);
    console.log("depositAmount: ", depositAmount);
    console.log("depositReturnDate: ", depositReturnDate);
    if (activeStep === 0) {
      if (cardName && cardNumber && expDate && cvv && !allFields) {
        console.log("All fields are full!");
        setAllFields(true);
      }
    }
    else {
      if (depositAmount && depositReturnDate && !allFields) {
        console.log("All fields are full!");
        setAllFields(true);
      }
    }
    console.log("activeStep === steps.length: ", activeStep === steps.length, " activeStep: ", activeStep, " steps.length: ", steps.length);

  }


  React.useEffect(() => {
    if (activeStep === steps.length) {
      sendDepositData();
    }
  }, [activeStep])


  //This function sends the data to the server.
  const sendDepositData = () => {
    console.log("The function run!");
    let _cardNumber = cardNumber
    console.log("cardName: ", cardName);
    if (cardNumber && cardNumber.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
      _cardNumber = cardNumber.replace(/-/g, '');
    }
    console.log("cardNumber: ", _cardNumber);
    console.log("expDate: ", expDate);
    console.log("cvv: ", cvv);
    console.log("depositAmount: ", depositAmount);
    console.log("depositReturnDate: ", depositReturnDate);
    console.log("userId: ", id);
    if (cardName && cardNumber && expDate && cvv && depositAmount && depositReturnDate) {
      const card = {
        cardId: 0,
        userId: parseInt(id.userId),
        creditCardNumber: _cardNumber,
        ownersName: cardName,
        cvv: cvv,
        validity:new Date(expDate).toISOString() ,
        

        /*
        "cardId": 0,
  "userId": 0,
  "creditCardNumber": "string",
  "ownersName": "string",
  "cvv": "string",
  "validity": "2024-03-06T12:35:11.750Z"
        */
      }
      console.log("card: ", JSON.stringify(card));
      let URL = "https://localhost:7275/api/Card/AddNewCard";
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'accept': 'text/plain',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(card),
      })
        .then((response) => {
          response.json().then((data) => {
            console.log("Server responsed!! Data: " + JSON.stringify(data));
            if (data == -3) {
              setError("You're not logged in. Please log in and try again.")
            }
            if (data > 0) {
              alert("Your card was added successfully!")
              setCard(data)
              let depositData = {
                depositId: 0,
                userId: parseInt(id.userId),
                sum: parseInt(depositAmount),
                dateToPull: new Date(depositReturnDate).toISOString().split('T')[0],
                /*cardName: cardName,
                cardNumber: _cardNumber,
                expDate: expDate,
                cvv: cvv,
                depositAmount: depositAmount,
                depositReturnDate: depositReturnDate,*/
              }
              console.log("depositData: ", depositData);
              fetch('https://localhost:7275/api/Deposit/AddADeposit', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(depositData)
              }).then(response => {
                console.log("Response is: ", response);
                console.log("Res message: ", response.message)
                return response.json();
              }).then(data => {
                console.log("Data is: ", data);
                if (data == -2) {
                  alert("You're not logged in. Please log in and try again.")
                }
                if (data > 0) {
                  alert("Your deposit was added successfully!")
                  setSuccessed(true)
                }
                else if (data == -1) {
                  alert("Error. Please try again.")
                }

              }).catch(err => {
                console.log("Error is: ", err);
              })
            }
            else if (data == -1) {
              setError("Error. Please try again.")
            }
          })
            .catch((error) => {
              console.error('Error:', error);
              setError("Error: " + error)
            })
            .finally(() => {
              console.log("Finally");
            });
        })

    }
    else {
      setError("Please fill all the fields.")
    }
  }



  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Plus Minus
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" >
            New deposit file
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ?
            (successed ?
              (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your giving.
                  </Typography>
                  <Typography variant="subtitle1">
                    Plus minus Thank you for your giving.
                    <Typography variant="subtitle1">
                      <p>
                        Thank you for considering making a donation to our cause.
                      </p><p>
                        Your contribution will help us make a positive impact in the community. </p><p>
                        Every donation, no matter how big or small, makes a difference.</p><p>
                        <strong>Together, we can create a better future.</strong></p>
                    </Typography>
                    We have emailed you when your deposit will can be attracten.

                  </Typography>
                  <div style={{ marginTop: "3%", marginLeft: "1%", padding: "3%" }}>
                    <BasicButtons value="Back to your personal area" function={() => { window.location.href = `/Register/${id}/${name}`; }} />
                  </div>
                </React.Fragment>
              ) : (<React.Fragment>
                <Typography variant="h5" gutterBottom>
                  <strong>Hooooops...</strong>

                  <Typography variant="subtitle1">
                    Sorry, but something bad happend, and your giving doesn't enter to PlusMinus's accoumt.
                  </Typography>
                  <Typography variant="subtitle1">
                    {error}
                  </Typography>
                  <Typography variant="subtitle1">
                    Please try again.  (If the problem repeat- write for us and we will check it as soon as we can.)
                  </Typography>
                  <Button onClick={
                    setTimeout(() => {
                      setActiveStep(0)
                    }, 3000)}>Try again</Button>
                </Typography>
              </React.Fragment>)
            ) : (
              <React.Fragment>
                {[getStepContent(activeStep), handleButtonShow]}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      {activeStep === steps.length - 1 ? "Edit" : "back"}
                    </Button>
                  )}
                  {allFields && handleButtonShow()}
                  {console.log("card: ", card, "card == '': ", card == '', "card == null: ", card == null)}
                  {allFields || card != '' ?
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleNext();
                        handleButtonShow();
                      }}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'End' : 'Next'}

                    </Button> : <></>
                  }
                  {activeStep === steps.length - 1 ?
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleNext();
                        handleButtonShow();
                      }}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'End' : 'Next'}

                    </Button> : <></>
                  }
                </Box>
              </React.Fragment>
            )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment >
  );
}