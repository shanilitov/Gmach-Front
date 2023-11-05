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
  console.log("Show alert is: "+props.showAlert)
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
              <h2>{props.date.toString()}</h2>
              {props.showAlert ? <Alert type="info" msg="Deposit can be extended" />: <></>}

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
