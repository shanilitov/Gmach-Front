import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Deposit from './Deposit';
import Alert from './Alert';
import { useState } from 'react';
import moment from 'moment';

export default function AlignItemsList(props) {
  const [showAlert, setShowAlert] = useState(props.showAlert);
  const [AmountSize, setAmountSize] = useState(0);

  function addCommasToNumberString(str) {
    const num = parseInt(str.replace(/,/g, ''));
    return num.toLocaleString('en-US');
  }

  let titles = ["Small Deposit", "Medium Deposit", "Large Deposit", "Extra Large Deposit"]
  let today = new Date().toLocaleDateString('en-GB');// Format("dd/MM/yyyy")
  let date = new Date(props.date).toLocaleDateString('en-GB');// Format("dd/MM/yyyy")
  let str = props.amount;
  str = str.split(": ");
  let sum = addCommasToNumberString(str[1]);
  
 
  /*for (let i=0; i<sum.length();i++){
    console.log(i,sum[i])

  }*/
  //let i_size = 0;


  React.useEffect(() => {
    if (today == date || new Date(date).getTime() < new Date().getTime()) {
      console.log("today is: ", today)
      console.log("new Date(date).getTime()<new Date().getTime()", new Date(date).getTime() < new Date().getTime())
      setShowAlert(true);
    }
    let amount = props.amount;
    amount = amount.toString();
    console.log("amount is: ", amount)
    amount = amount.split(": ");
    console.log("amount is: ", amount)
    amount = amount[1].split("$");
    console.log("amount is: ", amount)
    amount = amount[0].split(",");
    let IntAmount = parseInt(amount[0]); //Cast amount of deposit to int.
    console.log("IntAmount is: ", IntAmount)
    if (IntAmount <= 100000) {
      if (IntAmount <= 50000) {
        if (IntAmount <= 10000) {
          console.log("AmountSize is: ", 0)
          setAmountSize(0)
        }
        else {
          console.log("AmountSize is: ", 1)
          setAmountSize(1)
        }

      }
      else {
        console.log("AmountSize is: ", 2)
        setAmountSize(2)
      }

    }
    else {
      console.log("AmountSize is: ", 3)
      setAmountSize(3)
    }

  }, [today, date],)

 

  
  //const [showAlert, setShowAlert] = useState(props.showAlert);  

  return (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="ProfileImg" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={titles[AmountSize]}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {titles[AmountSize]}
              </Typography>
              <h2>Deposit amount: {sum}</h2>
              <h3>Withdrawal date: {moment(props.date, 'DD/MM/YYYY').format('MM/DD/YYYY')}</h3>
              {showAlert ? <Alert type="info" msg="Deposit can be extended" /> : <></>}

              {/*<Deposit/>*/}
              {/* {" — I'll be in your neighborhood doing errands this…"}*/}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

    </List>
  );
}
