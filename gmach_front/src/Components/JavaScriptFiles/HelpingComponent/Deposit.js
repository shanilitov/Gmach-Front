import * as React from 'react'; 
import Alert from "./Alert";
import { IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useState } from 'react';

export default function Deposit(props) {
    const [showAlert, setShowAlert] = useState(false);  

    let sums = ["5000$", "10500$", "32000$", "25000$" ]//props.sum
    let dates = ["23/11/2023", "04/11/2023", "31/12/2023", "01/02/2024" ]//props.date
    let today = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();    
    let i_sums = 0;
    let i_dates = 0;
    
    React.useEffect(() => {
        if (today == dates[i_dates] || today > dates[i_dates]){
            setShowAlert(true);
        }
    }, [today, dates, i_dates]);
    const depositInfo = sums.map((sum, index) => (
        < span key={index}>
            <h2>Deposit amount: {sum.toString()}</h2>
            <h2>Withdrawal date: {`${new Date(dates[index]).getDay()}/${new Date(dates[index]).getMonth()}/${new Date(dates[index]).getFullYear()}`}</h2>

        </span>
    ));

    return(
        
       <>
            <h1>Deposit</h1>
            {depositInfo}
            <h2>Today's date: {today}</h2>
            {showAlert ? <><Alert type="info" msg="Deposit can be extended" /></>: null}
        </>
    )
}


// More options:    
// <Alert severity="warning">This is a warning alert — check it out!</Alert>
// <Alert severity="info">This is an info alert — check it out!</Alert>
// <Alert severity="success">This is a success alert — check it out!</Alert>
// <Alert severity="error">This is an error alert — check it out!</Alert>
// <Alert onClose={() => {}} severity="info">
//   This is a success alert — check it out!
// </Alert>
// <Alert
//   action={
//     <IconButton
//       aria-label="close"
//       color="inherit"
//       size="small"
//       onClick={() => {
//         setShowAlert(false);
//       }}
//     >
//       <ThumbUpAltIcon fontSize="inherit" />
//     </IconButton>
//   }
// >
