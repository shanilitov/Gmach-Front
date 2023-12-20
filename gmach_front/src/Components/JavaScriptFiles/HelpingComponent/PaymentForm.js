import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../../CSSFiles/StylePage.css";


export default function PaymentForm(props) {
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
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.bank(ev.target.value);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Branch bank number"
            fullWidth
            variant="standard"
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.branch(ev.target.value);
              }
            }}
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
            onChange={(ev) => {
              if (/^\d+$/.test(ev.target.value)) {
                props.account(ev.target.value);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name of account owner"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={(ev) => {
              if (/^[a-zA-Z]+$/.test(ev.target.value)) {
                props.owner(ev.target.value);
              }
            }}
          />
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
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              props.check1(ev.target.value)
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
            label="Bank number"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={(ev) => {
              props.check2(ev.target.value)
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