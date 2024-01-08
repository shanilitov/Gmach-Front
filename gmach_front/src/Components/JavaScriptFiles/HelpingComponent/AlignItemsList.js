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
import DialogOfDetails from './DialogOfDetails';

export default function AlignItemsList(props) {
  const [showAlert, setShowAlert] = useState(props.showAlert);
  const [AmountSize, setAmountSize] = useState(0);

  console.log("props are: ", props, "{props} asr: ", { props });
  function addCommasToNumberString(str) {
    const num = parseInt(str.replace(/,/g, ''));
    return num.toLocaleString('en-US');
  }
  console.log("Props.date after casting is: " + props.date + " and in moment it is: " + moment(props.date, 'MM-DD-YYYY').format('DD/MM/YYYY'));
  let titles = ["Small Deposit", "Medium Deposit", "Large Deposit", "Extra Large Deposit"]
  let today = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
  let date = props.date; //moment(props.date is in format: 'DD/MM/YYYY';
  console.log("Date came from props is: " + props.date + " and now: " + date);
  let str = props.amount;
  str = str.split(": ");
  let sum = addCommasToNumberString(str[1]);

  React.useEffect(() => {
    if (today === date || moment(date, 'DD/MM/YYYY').isBefore(moment())) {
      setShowAlert(true);
    }

    let amount = props.amount;
    amount = amount.toString();
    amount = amount.split(": ");
    amount = amount[1].split("$");
    amount = amount[0].split(",");
    let IntAmount = parseInt(amount[0]);
    if (IntAmount <= 100000) {
      if (IntAmount <= 50000) {
        if (IntAmount <= 10000) {
          setAmountSize(0)
        }
        else {
          setAmountSize(1)
        }

      }
      else {
        setAmountSize(2)
      }

    }
    else {
      setAmountSize(3)
    }

  }, [today, date],)

  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'Background.paper', display:"grid", gridColumn:"2"}}>
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="ProfileImg" src="https://cucuvia.com/UploadImages-HE/Org27/Catalog38/1.jpg" />
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
                {props.name}
              </Typography>
              <h2 style={{color: 'rgb(0,32,96)'} }>Deposit amount: {sum}</h2>
              <h3>Withdrawal date: {date}</h3>
              {showAlert ? <Alert type="info" msg="Deposit can be extended" /> : <></>}
            </React.Fragment>
          }
        />
      </ListItem>
      {showAlert?
     <div className='dialogBox'> <DialogOfDetails type="deposit" canBeWithdraw={showAlert}/></div> :null}
      <Divider variant="inset" component="li" />
    </List>
    
  );
}
