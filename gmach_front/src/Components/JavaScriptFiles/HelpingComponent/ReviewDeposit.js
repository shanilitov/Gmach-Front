import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';



const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
  const [LoanAmount, setLoanAmount] = useState(0);
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState("00-00-0000");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter amount and date
      </Typography>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard" onChange={(ev) => { setLoanAmount(ev.target.value) }}>
        <InputLabel htmlFor="standard-adornment-amount">Deposit amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Date to get my money back
      </Typography>


      <TextField
        id="standard-basic"
        label=""
        type="date"
        variant="standard"
        helperText="Expected withdrawal date."
        func={(ev) => setTime(ev)}
      />

 
    </React.Fragment >
  );
}