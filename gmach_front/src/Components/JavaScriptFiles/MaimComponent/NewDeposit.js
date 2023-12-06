import * as React from 'react';
import { useParams } from 'react-router-dom';
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
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [allFields, setAllFields] = React.useState(false);
  const [depositAmount, setDepositAmount] = React.useState("");
  const [depositReturnDate, setDepositReturnDate] = React.useState("");
  const { userId } = useParams();
  const { userName } = useParams();
    const steps = ['Payment details', 'Amount and date', 'Review details'];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        // return <Details />;
        return <DepositPaymentForm onCardName={cardNameHandler} onCardNumber={cardNumberHandler} onExpDate={expDateHandler} onCvv={cvvHandler} onFields={handleButtonShow} />;
      case 1:
        return <DepositDateAndAmount onAmount={depositAmountHandler} onDate={depositReturnDateHandler} onFields={handleButtonShow} />;
      case 2:
        return <ReviewDeposit amount={depositAmount} date={depositReturnDate} expDate={expDate} cardNumber={cardNumber}/>;
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
  }

  const depositReturnDateHandler = (depositReturnDate) => {
    console.log("Father. depositReturnDateHandler run!", depositReturnDate)
    setDepositReturnDate(depositReturnDate);
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
    console.log("activeStep === steps.length: ", activeStep === steps.length," activeStep: ", activeStep, " steps.length: ", steps.length);
    
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
    console.log("user1: ");
    let account={}
    let depositData = {
      DepositId: 0,
      UserId: userId,
      Sum: depositAmount,
      DateToPull: depositReturnDate,
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(depositData)
    }).then(response => {
      console.log("Response is: ", response);
      return response.json();
    }).then(data => {
      console.log("Data is: ", data);
    }).catch(err => {
      console.log("Error is: ", err);
    })
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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your giving.
              </Typography>
              <Typography variant="subtitle1">
                Plus minus Thank you for your giving. 
                <Typography variant="subtitle1">
                <strong>Your deposit number is #2001539.</strong>
                </Typography>
                 We have emailed you when your deposit will can be attracten.
               
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {[getStepContent(activeStep), handleButtonShow]}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1?"Edit": "back"}
                  </Button>
                )}
                {allFields && handleButtonShow()}
                {allFields ?
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
    </React.Fragment>
  );
}