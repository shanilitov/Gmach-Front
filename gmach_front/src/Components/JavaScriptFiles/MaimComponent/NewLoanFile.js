import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "../HelpingComponent/AddressForm";
import PaymentForm from "../HelpingComponent/PaymentForm";
import Review from "../HelpingComponent/Review";
import "../../../CSSFiles/StylePage.css";
import { useState, useEffect } from "react";
import ErrorAlert from "../HelpingComponent/ErrorAlert";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Plus Minus
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "Enter Guarantors details",
  "Acounts details",
  "Review your request",
];

export default function NewLoanFile(props) {

  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  //Data from sons:
  //AddressForm file:
  const [GuarantorName1, setGuarantorName1] = useState("");
  const [GuarantorName2, setGuarantorName2] = useState("");
  const [GuarantorLastName1, setGuarantorLastName1] = useState("");
  const [GuarantorLastName2, setGuarantorLastName2] = useState("");
  const [GuarantorEmail1, setGuarantorEmail1] = useState("");
  const [GuarantorEmail2, setGuarantorEmail2] = useState("");
  const [GuarantorPhone1, setGuarantorPhone1] = useState("");
  const [GuarantorPhone2, setGuarantorPhone2] = useState("");
  const [sonAlert, setSonAlert] = useState(false)
  const [LoanAmount, setLoanAmount] = useState("0");
  const [allFields, setAllFields] = useState(false);

  //PaymentForm.js:
  const [rememberAccount, setRememberAccount] = React.useState(true);
  const [accountNum, setAccountNum] = React.useState("");
  const [bankNum, setBankNum] = React.useState("");
  const [branchNum, setBranchNum] = React.useState("");
  const [check1, setCheck1] = React.useState("");
  const [check2, setCheck2] = React.useState("");

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep === steps.length)
    fetchLoanData(); 

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const [val, setVal] = useState("initial value")

  //AddressForm file:
  const handleGuarantorName1 = (name) => {
    setGuarantorName1(name)
    console.log(name)
  }
  const handleGuarantorName2 = (name) => {
    setGuarantorName2(name)
    console.log(name)

  }
  const hanlderGuarantorLastName1 = (lName) => {
    setGuarantorLastName1(lName);
    console.log(lName)

  }
  const hanlderGuarantorLastName2 = (lName) => {
    setGuarantorLastName2(lName);
    console.log(lName)
  }
  const handlerGuarantorEmail1 = (email) => {
    setGuarantorEmail1(email)
  }
  const handlerGuarantorEmail2 = (email) => {
    setGuarantorEmail2(email)
  }
  const handlerGuarantorPhone1 = (phone) => {
    setGuarantorPhone1(phone);
  }
  const handlerGuarantorPhone2 = (phone) => {
    setGuarantorPhone2(phone);
  }

  //PaymentForm.js:
  const handleBankNum = (number) => {
    console.log(number)
    setBankNum(number)
  }
  const handleAccountNum = (number) => {
    console.log(number)
    setAccountNum(number)
  }
  const handleBranchNum = (number) => {
    console.log(number)
    setBranchNum(number)
  }
  const handleCheck1  =(link) =>{
    console.log("link1: ", link)
    setCheck1(link)
  }
  const handleCheck2  =(link) =>{
    console.log("link2: ", link)
    setCheck2(link)
  }



  useEffect(() => {
    if (
      GuarantorName1 !== "" &&
      GuarantorName2 !== "" &&
      GuarantorLastName1 !== "" &&
      GuarantorLastName2 !== "" &&
      GuarantorEmail1 !== "" &&
      GuarantorEmail2 !== "" &&
      GuarantorPhone1 !== "" &&
      GuarantorPhone2 !== "" &&
      LoanAmount !== "0"
    ) {
      console.log("All fields: ", "Amount: " + LoanAmount, ". Details: ", GuarantorName1, GuarantorName2, GuarantorLastName1, GuarantorLastName2, GuarantorEmail1, GuarantorEmail2, GuarantorPhone1, GuarantorPhone2);
      setAllFields(true);
    } else {
      setAllFields(false);
    }
  }, [
    GuarantorName1,
    GuarantorName2,
    GuarantorLastName1,
    GuarantorLastName2,
    GuarantorEmail1,
    GuarantorEmail2,
    GuarantorPhone1,
    GuarantorPhone2,
    LoanAmount,
  ]);

  async function fetchLoanData() {
    const url = "https://localhost:7275/api/LoanDetails/AddNewLoan";
    const data = {
      OwnerFullName: "John Doe",
      AccountNumber: "123456789",
      BankNumber: "987654321",
      BranchNumber: "1234",
      UserId: "12345"
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm onChange={(value) => setVal(value)} amount={setLoanAmount} gName1={handleGuarantorName1} gName2={handleGuarantorName2} glName1={hanlderGuarantorLastName1} glName2={hanlderGuarantorLastName2} gEmail1={handlerGuarantorEmail1} gEmail2={handlerGuarantorEmail2} gPhone1={handlerGuarantorPhone1} gPhone2={handlerGuarantorPhone2} all={setAllFields} alert={setSonAlert} />;
      case 1:
        //setAllFields(false)
        return <PaymentForm setRememberAccount={setRememberAccount} rememberAccount={rememberAccount} bank={handleBankNum} account={handleAccountNum} branch={handleBranchNum}  check1={handleCheck1} check2={handleCheck2}/>;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        sx={{
          position: "fixed",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <strong>
              <h2>Plus Minus</h2>
            </strong>
          </Typography>
        </Toolbar>
        <div id="space"></div>
        <div id="space2"></div>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 4, md: 20 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Apply for a loan
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 6, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                <strong>
                  Your request has been forwarded to the system administrator.
                </strong>
              </Typography>
              <Typography variant="subtitle1">
                Be'ezrat Hashem in the coming days you will receive an update to
                your email address.
                <br />
                Apply number: <strong>#12D9e74</strong>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {(allFields && sonAlert == false) ?
                  (<Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Send" : "Next"}
                  </Button>) : null
                }
                {val}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
