import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorAlert from './ErrorAlert';

export default function Details() {
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            onChange={(ev) => {
              const englishTextRegex = /^[A-Za-z]+$/;
              if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                setError(false);
              }
              else {
                setError(true);
                setErrorMsg("First name must be in English letters only");
              }
            }}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            onChange={(ev) => {
              const englishTextRegex = /^[A-Za-z]+$/;
              if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                console.log(ev.target.value);
              }
              else {
                setError(true);
                setErrorMsg("Last name must be in English letters only");
              }
            }}
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Street address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            onChange={(ev) => {
              const englishTextRegex = /^[A-Za-z]+$/;
              if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                console.log(ev.target.value);
              }
              else {
                setError(true);
                setErrorMsg("City must be in English letters only");
              }
            }}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            onChange={(ev) => {
              const englishTextRegex = /^[A-Za-z]+$/;
              if (englishTextRegex.test(ev.target.value) || ev.target.value === "") {
                console.log(ev.target.value);
              }
              else {
                setError(true);
                setErrorMsg("Country must be in English letters only");
              }
            }}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for mail delivery"
          />
        </Grid>
        {error && <ErrorAlert msg={errorMsg} />}
      </Grid>
    </React.Fragment>
  );
}