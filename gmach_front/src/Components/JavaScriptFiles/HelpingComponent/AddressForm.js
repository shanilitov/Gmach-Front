import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

export default function AddressForm() {
  const [Guarantor1, setGuarantor1] = useState("");
  const [Guarantor2, setGuarantor2] = useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Guarantors details
      </Typography>
      <div><h4>First Guarantor:</h4></div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            func={(ev) => setGuarantor1(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Email address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Phone number"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            type="tel"

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Bank number"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
      </Grid>

      <div><h4>Second Guarantor:</h4></div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName2"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            func={(ev) => setGuarantor2(ev.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName2"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address2"
            name="address1"
            label="Email address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Phone number"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            type="tel"

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city2"
            name="city"
            label="Bank number"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state2"
            name="state"
            label="Branch bank number"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip2"
            name="zip"
            label="Account number"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" required={true}/>
            }
            label="I agree to save the data I entered in the association's database."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
