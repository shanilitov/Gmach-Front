import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import BasicTextFields from "./BasicTextFields";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";
import "../../../CSSFiles/StylePage.css";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import { ClickAwayListener } from "@mui/material";

export default function AddressForm(props) {
  const [GuarantorName1, setGuarantorName1] = useState("");
  const [GuarantorName2, setGuarantorName2] = useState("");
  const [GuarantorLastName1, setGuarantorLastName1] = useState("");
  const [GuarantorLastName2, setGuarantorLastName2] = useState("");
  const [GuarantorEmail1, setGuarantorEmail1] = useState("");
  const [GuarantorEmail2, setGuarantorEmail2] = useState("");
  const [GuarantorPhone1, setGuarantorPhone1] = useState("");
  const [GuarantorPhone2, setGuarantorPhone2] = useState("");
  const [LoanAmount, setLoanAmount] = useState("0");
  const [showAlert, setShowAlert] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [message, setMessage] = useState("");
  const [DeedOfGuarantee, setDeedOfGuarantee] = useState(""); 
  const [time, setTime] = useState("00-00-0000");



  /* const handleClickAway = () => {
      setShowDate(false);
    };
  */
  // 93: <ClickAwayListener onClickAway={handleClickAway}></ClickAwayListener >


  function GuarantorsDetails() {
    if ((GuarantorName1 != "") & (GuarantorName2 != "")) {
    } else {
      //Name is or Names are empty
      setMessage("Sorry, but you forgot to fill in the guarantor name field.");
      setShowAlert(true);
    }
  }

  function tryMe() {
    //if (GuarantorName1 == "" || GuarantorName2 == "")
    props.onChange(LoanAmount);
  }



  return (
    <React.Fragment>
      <p>Hi,</p>
      <p>
        <strong>Plus Minus</strong> tries to do it's best to help people to get
        loans.
      </p>
      <p>
        But, our resources are limit, and depend on investors contributing to the
        association's account.
      </p>
      <p>We hope we will be able to assist you.</p>
      <Typography variant="h5" gutterBottom>
        <strong>Loan details</strong>
      </Typography>

      <div className="LoanDuring">
        <Typography variant="h7" gutterBottom>
          How long do you need a loan for?
        </Typography>
        <RadioGroup name="use-radio-group" defaultValue="first">
          {/*<FormControlLabel
            value="first"
            label="For a month"
            onClick={() => { setTime("+1") }}
            control={<Radio />}
          />
          <FormControlLabel
            value="second"
            label="For two monthes"
            onClick={() => { setTime("+2") }}
            control={<Radio />}
          />
          <FormControlLabel
            value="Third"
            onClick={() => { setTime("+6") }}
            label="For six monthes"
            control={<Radio />}
          />*
          <FormControlLabel
            value="firth"
            label="other"
            onClick={() => {
              setShowDate(true);
            }}
            control={<Radio />}
          />

          {showDate == true ? (*/}
          <TextField
            id="standard-basic"
            label=""
            type="date"
            variant="standard"
            helperText="Choose loan repayment date."
            onBlur={((ev) => {
              setTime(new Date(ev.target.value).toISOString())
              props.time(new Date(ev.target.value))
              console.log(ev.target.value)
              console.log(new Date(ev.target.value).toISOString());
              
              
            })}
          //func={(ev) => setTime(ev)}
          />
          {/* ) : (
            <></>
          )}*/}

        </RadioGroup>

      </div>
      <FormControl value={LoanAmount} fullWidth sx={{ m: 1 }} variant="standard" onChange={(ev) => {
        const inputValue = ev.target.value.toString();
        if (/^\d+$/.test(inputValue) && parseInt(inputValue) > 0) {
          props.amount(inputValue);
          props.alert(false)
        } else {
          setShowAlert(true);
          setMessage("Please enter a valid sum.")
          props.alert(true)
        }
        setLoanAmount(inputValue)
      }}>
        <InputLabel htmlFor="standard-adornment-amount">Loan amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <div className="spaceInAddressPage"></div>
      <Typography variant="h5" gutterBottom>
        <strong> Guarantors details</strong>
      </Typography>
      <div>
        <h4>First Guarantor:</h4>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={GuarantorName1}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(ev) => {
              const englishLettersRegex = /^[A-Za-z]+$/;
              if (englishLettersRegex.test(ev.target.value)) {
                setShowAlert(false)
                props.gName1(ev.target.value);
                props.alert(false)
              }
              else {
                setMessage("Name should contain only English letters")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorName1(ev.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            value={GuarantorLastName1}
            autoComplete="family-name"
            variant="standard"
            onChange={(ev) => {
              const englishLettersRegex = /^[A-Za-z]+$/;
              if (englishLettersRegex.test(ev.target.value)) {
                props.alert(false)
                setShowAlert(false)
                props.glName1(ev.target.value);
              }
              else {
                setMessage("Last name should contain only English letters")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorLastName1(ev.target.value);
            }}
            onBlur={(ev) => {
              const englishLettersRegex = /^[A-Za-z]+$/;
              if (englishLettersRegex.test(ev.target.value)) {
                props.alert(false)
                setShowAlert(false)
                props.glName1(ev.target.value);
              }
              else {
                setMessage("Last name should contain only English letters")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorLastName1(ev.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Email address"
            value={GuarantorEmail1}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="email"
            onChange={(ev) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(ev.target.value)) {
                props.gEmail1(ev.target.value);
                setShowAlert(false)
                props.alert(false)
              }
              else {
                setMessage("Invalid email address.")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorEmail1(ev.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Phone number"
            fullWidth
            value={GuarantorPhone1}
            autoComplete="shipping address-line2"
            variant="standard"
            type="tel"
            onChange={(ev) => {
              const phoneRegex = /^05\d{8}$/;
              if (phoneRegex.test(ev.target.value)) {
                props.gPhone1(ev.target.value);
                setShowAlert(false);
                props.alert(false);
              } else {
                props.alert(true);
              }
              setGuarantorPhone1(ev.target.value)
            }}
          />
        </Grid>
      </Grid>

      <div>
        <h4>Second Guarantor:</h4>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName2"
            name="firstName"
            label="First name"
            value={GuarantorName2}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(ev) => {
              const englishLettersRegex = /^[A-Za-z]+$/;
              if (englishLettersRegex.test(ev.target.value)) {
                setShowAlert(false)
                props.alert(false)
                props.gName2(ev.target.value);
              }
              else {
                setMessage("Name should contain only English letters")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorName2(ev.target.value)
            }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName2"
            name="lastName"
            label="Last name"
            value={GuarantorLastName2}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(ev) => {
              const englishLettersRegex = /^[A-Za-z]+$/;
              if (englishLettersRegex.test(ev.target.value)) {
                setShowAlert(false)
                props.glName2(ev.target.value);
                props.alert(false)
              }
              else {
                setMessage("Last name should contain only English letters")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorLastName2(ev.target.value)
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="address1"
            label="Email address"
            value={GuarantorEmail2}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="email"
            onChange={(ev) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(ev.target.value)) {
                props.gEmail2(ev.target.value);
                setShowAlert(false)
                props.alert(false)
              }
              else {
                setMessage("Invalid email address.")
                setShowAlert(true)
                props.alert(true)
              }
              setGuarantorEmail2(ev.target.value)
            }} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Phone number"
            value={GuarantorPhone2}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            type="tel"
            onChange={(ev) => {
              const phoneRegex = /^05\d{8}$/;
              if (phoneRegex.test(ev.target.value)) {
                props.gPhone2(ev.target.value);
                props.alert(false)
                setShowAlert(false)
              }
              else {
                props.alert(true)
                setMessage("Please enter a valid phone number.")
                setShowAlert(true)
              }
              setGuarantorPhone2(ev.target.value)
            }}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
          id="textFieldId"
          name="textFieldName"
          label="Link of picture of the deed of guarantee"
          value={DeedOfGuarantee}
          fullWidth
          autoComplete="on"
          variant="standard"
          onChange={(ev) => {
            setDeedOfGuarantee(ev.target.value);
            props.deed(ev.target.value);
            // handle text field change
          }}
        />
      </Grid>


     
      </Grid>

     

    </React.Fragment>

  );
}