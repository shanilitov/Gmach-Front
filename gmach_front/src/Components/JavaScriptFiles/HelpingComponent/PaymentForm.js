import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../../CSSFiles/StylePage.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function PaymentForm(props) {
  const [bank, setBank] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [check1, setCheck1] = React.useState("");
  const [check2, setCheck2] = React.useState("");
  const [picture, setPicture] = React.useState("");
  //const [fileName, setFileName] = useState("No file choossen");
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  let rememberAccount = props.rememberAccount;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Guarantee checks
      </Typography>

      <Grid container spacing={4}>
        <Typography variant="h6" style={{ marginTop: "5%", marginLeft: "3%", display: "block" }} gutterBottom>
          Your bank accounnt details
        </Typography>

        <div className="H_BankDetails" style={{ display: "block" }}>
          <strong> PlusMinus will use it in case your request will be approved </strong>
        </div>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Bank number"
            value={bank}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.bank(ev.target.value);
              }
              setBank(ev.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Branch bank number"
            value={branch}
            fullWidth
            variant="standard"
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.branch(ev.target.value);
              }
              setBranch(ev.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Account number"
            value={account}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.account(ev.target.value);
              }
              setAccount(ev.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name of account owner"
            value={owner}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(ev) => {
              if (/^[a-zA-Z]+$/.test(ev.target.value)) {
                props.owner(ev.target.value);
              }
              setOwner(ev.target.value);
            }}
          />
        </Grid>


        <Grid item xs={24}>
          <TextField
            required
            id="name"
            name="name"
            label="Link to a picture of the account management document"
            value={picture}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(ev) => {
              if (/^[a-zA-Z]+$/.test(ev.target.value)) {
                props.picture(ev.target.value);
              }
              setPicture(ev.target.value);
            }}
          />
          {/*< <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload account management document
          <VisuallyHiddenInput
            type="file"
            onChange={(ev) => {
              const file = ev.target.files[0];
              if (file) {
                setFileName(file.name);
                props.file(file);
                // Handle the file upload logic here
              } else {
                setFileName("No file chosen");
              }
            }}
          />
        </Button>
        <p>{fileName}</p>
         input
            style={{ width: "50%", borderRadius: "5px", marginLeft: "3%" }}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(ev) => {
              const file = ev.target.files[0];
              // Handle the file upload logic here
            }}
          />*/}
        </Grid>



      </Grid>
      <div className="H_BankDetails">
        <strong>First guarantor</strong>
      </div>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Link of first check"
            value={check1}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              props.check1(ev.target.value)
              setCheck1(ev.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>

        </Grid>
      </Grid>
      <div className="H_BankDetails">
        <strong>Second guarantor</strong>
      </div>
      <Grid container spacing={4}>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Link of second check"
            value={check2}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              props.check2(ev.target.value)
              setCheck2(ev.target.value);
            }}
          />
        </Grid>


      </Grid>
    </React.Fragment>
  );
}

/**
 *  <Grid item xs={12}>
          <FormControlLabel /*onChange={props.setRememberAccount(!rememberAccount)}
          control={<Checkbox color="#1976d2" name="saveCard" value="yes" />}
          label="Remember my account for next time."
        />

      </Grid>



       <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
 */

/**
 *<Grid item xs={12} sm={6}>
  <TextField
    id="state"
    name="state"
    label="Branch bank number"
    fullWidth
    variant="standard"
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
    required
    id="zip"
    name="zip"
    label="Account number"
    fullWidth
    autoComplete="shipping postal-code"
    variant="standard"
  />
</Grid>
 */