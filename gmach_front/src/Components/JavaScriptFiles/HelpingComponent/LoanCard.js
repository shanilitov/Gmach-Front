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
import ErrorAlert from './Alert';

export default function LoanCard(props) {
    const [showAlert, setShowAlert] = useState(false);

    let title = "Loan";
    let loan = props.loan;
    let LoanDate = props.date;

    React.useEffect(() => {
        if (moment(LoanDate, 'DD/MM/YYYY').isBefore(moment())) {
            setShowAlert(true);
        }
    })

    function addCommasToNumberString(str) {
        const num = parseInt(str.replace(/,/g, ""));
        return num.toLocaleString("en-US");
    }

    function daysBetween(date) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const today = new Date();
        const givenDate = moment(date, "DD/MM/YYYY").toDate();
        const diffDays = Math.round(Math.abs((today - givenDate) / oneDay));
        console.log("diffDays is: " + diffDays);
        return diffDays;
    }

    return (
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="ProfileImg" src="https://digital-finance.co.il/wp-content/uploads/2021/01/%D7%94%D7%9C%D7%95%D7%95%D7%90%D7%94-%D7%9C%D7%A4%D7%99-%D7%A1%D7%9B%D7%95%D7%9D.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {title}
                            </Typography>
                            <h2>Loan amount: {addCommasToNumberString(loan)+"$"}</h2>
                            <h3>Debt maturity date: {LoanDate}</h3>
                            {showAlert ? <Alert type="error" msg='Worng!! Date of return passed!!' /> : <></>}
                            {daysBetween(LoanDate) < 7 ? <ErrorAlert type="warning" msg="You have less than 7 days to return the loan" /> : <></>}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />

        </List>
    )
}