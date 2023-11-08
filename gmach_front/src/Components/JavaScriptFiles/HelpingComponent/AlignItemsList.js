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
import {useState} from 'react';

export default function AlignItemsList(props) {  
  let type=props.type
  let today = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
  let date = new Date(props.date);
  const [showAlert, setShowAlert] = useState(props.showAlert);
  console.log("Show alert is: "+props.showAlert)

  React.useEffect(() => {
    if (today == date || new Date(date).getTime()<new Date().getTime()){
      console.log("new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() =  "+new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear())
      console.log("new Date(date).getTime()<new Date().getTime()"+new Date(date).getTime()<new Date().getTime())
      setShowAlert(true); 
    }
}, [today, date]);

  

  //const [showAlert, setShowAlert] = useState(props.showAlert);  

  return (
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="ProfileImg" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Deposit
              </Typography>
              <h2>{props.amount}</h2>
              <p>{props.date.toString()}</p>
              {showAlert ? <Alert type="info" msg="Deposit can be extended" />: <></>}

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
